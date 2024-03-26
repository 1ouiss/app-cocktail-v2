import { Button } from "react-native-paper";
import data from "../../../data/datas.json";
import { updateDoc } from "../../database/set";

const CreateDataInDb = () => {
  const createCocktail = async () => {
    data.cocktails.map(async (cocktail) => {
      await updateDoc({
        newDatas: cocktail,
        collectionId: "cocktails",
        callback: (id) => console.log(`Document created with id: ${id}`),
        docId: cocktail.id,
      });
    });
  };

  const createIngredients = async () => {
    data.ingredients.map(async (ingredient) => {
      await updateDoc({
        newDatas: ingredient,
        collectionId: "ingredients",
        callback: (id) => console.log(`Document created with id: ${id}`),
        docId: ingredient.id,
      });
    });
  };
  return (
    <>
      <Button
        onPress={() => {
          createCocktail();
        }}
      >
        Create cocktails
      </Button>
      <Button
        onPress={() => {
          createIngredients();
        }}
      >
        Create ingredients
      </Button>
    </>
  );
};

export default CreateDataInDb;
