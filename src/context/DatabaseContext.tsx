import { FC, createContext, useEffect, useState } from "react";
import { getDbDoc, getDbDocs } from "../database/read";
import { Cocktails, Ingredients, User } from "../../types/types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

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
  const [user , setUser] = useState<User>();
  const [isSigned, setIsSigned] = useState(false);

  const fetchDatas = async () => {
    ["ingredients", "cocktails"].map(async (collectionId) => {
      const datas = await getDbDocs({ collectionId });
      if (collectionId === "ingredients") setIngredients(datas);
      else setCocktails(datas);
    });
  };

  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
      const userSnapshot = await getDbDoc({ collectionId: "users", docId: value })
      userSnapshot && setUser(userSnapshot as User);
      }
    } catch (e) {
      console.log(e);      
    }
  }

  useEffect(() => {
    fetchDatas();
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
