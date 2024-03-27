import { FC, createContext, useEffect, useState } from "react";
import { getDbDocs } from "../database/read";
import { Cocktails, Ingredients } from "../../types/types";

type ContextType = {
  children: JSX.Element | JSX.Element[];
};

const DatabaseContext = createContext<{
  cocktails: Cocktails;
  ingredients: Ingredients;
  setCocktails: React.Dispatch<React.SetStateAction<Cocktails>>;
  setIngredients: React.Dispatch<React.SetStateAction<Ingredients>>;
}>({
  cocktails: [],
  ingredients: [],
  setCocktails: () => {},
  setIngredients: () => {},
});

const DatabaseContextProvider: FC<ContextType> = ({ children }) => {
  const [cocktails, setCocktails] = useState<Cocktails>([]);
  const [ingredients, setIngredients] = useState<Ingredients>([]);

  const fetchDatas = async () => {
    ["ingredients", "cocktails"].map(async (collectionId) => {
      const datas = await getDbDocs({ collectionId });
      if (collectionId === "ingredients") setIngredients(datas);
      else setCocktails(datas);
    });
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  return (
    <DatabaseContext.Provider
      value={{
        cocktails,
        ingredients,
        setCocktails,
        setIngredients,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

export { DatabaseContext, DatabaseContextProvider };
