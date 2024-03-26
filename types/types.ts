type IngredientType = {
  id: string;
  name: string;
  quantity: string;
};

type CocktailType = {
  id: string;
  name: string;
  description: string;
  ingredients: Omit<IngredientType, "name">[];
};

type Cocktails = CocktailType[];

type Ingredients = IngredientType[];

type Favorites = CocktailType[];

export { Cocktails, Ingredients, Favorites, CocktailType, IngredientType };
