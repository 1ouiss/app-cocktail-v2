import { NavigationProp } from "@react-navigation/native";

type IngredientType = {
  id: string;
  name: string;
  quantity: string;
};

type CocktailType = {
  id?: string;
  name: string;
  description: string;
  ingredients: IngredientType[];
  user?: string;
  image: string;
};

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  stock: IngredientType[];
  favorites: string[];
};

type Cocktails = CocktailType[];

type Ingredients = IngredientType[];

type Favorites = CocktailType[];

type NavigationProps = {
  navigation: NavigationProp<any>;
};

export {
  Cocktails,
  Ingredients,
  Favorites,
  CocktailType,
  IngredientType,
  NavigationProps,
  User,
};
