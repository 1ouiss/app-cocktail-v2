import { FC, createContext, useEffect, useState } from "react";
import { getDbDoc, getDbDocs } from "../database/read";
import {
  CocktailType,
  Cocktails,
  IngredientType,
  Ingredients,
  User,
} from "../../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

type ContextType = {
  children: JSX.Element | JSX.Element[];
};

const DatabaseContext = createContext<{
  cocktails: Cocktails;
  ingredients: Ingredients;
  user: User | undefined;
  isSigned: boolean;
  setCocktails: React.Dispatch<React.SetStateAction<Cocktails>>;
  setIngredients: React.Dispatch<React.SetStateAction<Ingredients>>;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  setIsSigned: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  cocktails: [],
  ingredients: [],
  setCocktails: () => {},
  setIngredients: () => {},
  user: undefined,
  setUser: () => {},
  isSigned: false,
  setIsSigned: () => {},
});

const DatabaseContextProvider: FC<ContextType> = ({ children }) => {
  const [cocktails, setCocktails] = useState<Cocktails>([]);
  const [ingredients, setIngredients] = useState<Ingredients>([]);
  const [user, setUser] = useState<User>();
  const [isSigned, setIsSigned] = useState(false);

  const fetchDatas = async () => {
    const collectionIngredientsRef = collection(db, "ingredients");
    const collectionCocktailsRef = collection(db, "cocktails");

    onSnapshot(collectionIngredientsRef, (snapshot) => {
      const ingredients: Ingredients = [];
      snapshot.forEach((doc) => {
        ingredients.push(doc.data() as IngredientType);
      });
      setIngredients(ingredients);
    });

    onSnapshot(collectionCocktailsRef, (snapshot) => {
      const cocktails: Cocktails = [];
      snapshot.forEach((doc) => {
        cocktails.push(doc.data() as CocktailType);
      });
      setCocktails(cocktails);
    });
  };

  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (!value) setIsSigned(false);
      const docRef = doc(db, "users", value as string);
      onSnapshot(docRef, (doc) => {
        if (doc.exists() === false) return;
        setUser && setUser(doc.data() as User);
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchDatas();
    console.log("user", user);
  }, []);

  useEffect(() => {
    getUser();
  }, [isSigned]);

  return (
    <DatabaseContext.Provider
      value={{
        cocktails,
        ingredients,
        setCocktails,
        setIngredients,
        user,
        setUser,
        isSigned,
        setIsSigned,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

export { DatabaseContext, DatabaseContextProvider };
