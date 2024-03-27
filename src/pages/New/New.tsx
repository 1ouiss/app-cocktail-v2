import { ScrollView, Text, View } from "react-native";
import PageLayout from "../../components/PageLayout/PageLayout";
import {
  CocktailType,
  IngredientType,
  NavigationProps,
} from "../../../types/types";
import { Button, Chip, Modal, TextInput } from "react-native-paper";
import { useContext, useState } from "react";
import { updateDoc } from "../../database/set";
import { DatabaseContext } from "../../context/DatabaseContext";
import { IconEye, IconPlus } from "@tabler/icons-react-native";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

const New: React.FC<NavigationProps> = ({ navigation }) => {
  const { user, ingredients } = useContext(DatabaseContext);
  const [cocktail, setCocktail] = useState<CocktailType>({
    name: "",
    ingredients: [],
    description: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleAddCocktail = async () => {
    console.log(cocktail);
    const newCocktail = {
      id: cocktail.name.toLocaleLowerCase().split(" ").join("_"),
      ...cocktail,
      user: user?.id,
    };

    await updateDoc({
      collectionId: "cocktails",
      docId: newCocktail.id,
      newDatas: newCocktail,
    });
  };

  const handleAddIngredient = (ingredient: IngredientType) => {
    if (cocktail.ingredients.includes(ingredient)) {
      setCocktail({
        ...cocktail,
        ingredients: cocktail.ingredients.filter((item) => item !== ingredient),
      });
      return;
    }
    setCocktail({
      ...cocktail,
      ingredients: [...cocktail.ingredients, ingredient],
    });
  };
  return (
    <PageLayout navigation={navigation}>
      <View
        style={{
          padding: 10,
          height: "100%",
          minHeight: "100%",
        }}
      >
        <TextInput
          label="Nom de votre cocktail"
          mode="outlined"
          value={cocktail.name}
          onChangeText={(e) => {
            setCocktail({ ...cocktail, name: e });
          }}
          right={<TextInput.Icon icon={(<IconEye />) as IconSource} />}
        />
        <TextInput
          label="Description de votre cocktail"
          mode="outlined"
          value={cocktail.description}
          onChangeText={(e) => {
            setCocktail({ ...cocktail, description: e });
          }}
        />
        {cocktail.ingredients.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 5,
              marginTop: 5,
            }}
          >
            {cocktail.ingredients.map((ingredient) => (
              <Chip
                key={ingredient.id}
                onPress={() => handleAddIngredient(ingredient)}
              >
                <Text>{ingredient.name}</Text>
              </Chip>
            ))}
          </View>
        )}
        <View>
          <Button onPress={() => setShowModal(true)} mode="contained">
            Ajouter un ingrédient
          </Button>
        </View>

        <Button onPress={() => handleAddCocktail()}>
          Ajouter mon cocktail
        </Button>
        <Modal
          visible={showModal}
          onDismiss={() => setShowModal(false)}
          contentContainerStyle={{
            backgroundColor: "white",
            padding: 20,
            margin: 20,
            zIndex: 1000,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {ingredients.map((ingredient) => (
              <Chip
                key={ingredient.id}
                style={{ margin: 5 }}
                mode={
                  cocktail.ingredients.includes(ingredient)
                    ? "flat"
                    : "outlined"
                }
                onPress={() => handleAddIngredient(ingredient)}
              >
                <Text>{ingredient.name}</Text>
              </Chip>
            ))}
          </View>
        </Modal>
      </View>
    </PageLayout>
  );
};

export default New;
