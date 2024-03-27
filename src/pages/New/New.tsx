import { Pressable, ScrollView, View } from "react-native";
import PageLayout from "../../components/PageLayout/PageLayout";
import {
  CocktailType,
  IngredientType,
  NavigationProps,
} from "../../../types/types";
import { Button, Chip, Modal, Text, TextInput } from "react-native-paper";
import { useContext, useEffect, useState } from "react";
import { updateDoc } from "../../database/set";
import { DatabaseContext } from "../../context/DatabaseContext";

const New: React.FC<NavigationProps> = ({ navigation }) => {
  const { user, ingredients } = useContext(DatabaseContext);
  const [cocktail, setCocktail] = useState<CocktailType>({
    name: "",
    ingredients: [],
    description: "",
  });

  const [availableIngredients, setAvailableIngredients] = useState<
    IngredientType[]
  >([]);

  const [newIngredient, setNewIngredient] = useState<string>("");

  const [modalVisible, setModalVisible] = useState<boolean>(false);

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

    setModalVisible(true);
  };

  const handleAddIngredient = (ingredient: IngredientType) => {
    setNewIngredient("");
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

  const handleAvailableIngredientsChange = (e: string) => {
    if (e === "") {
      setAvailableIngredients([]);
      return;
    }
    const filteredIngredients = ingredients.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(e.toLowerCase())
    );
    console.log(filteredIngredients);
    setAvailableIngredients(filteredIngredients);
  };

  const handleCreateNewIngredient = async () => {
    const ingredientToCreate: IngredientType = {
      id: newIngredient.toLocaleLowerCase().split(" ").join("_"),
      name: newIngredient,
    };
    await updateDoc({
      collectionId: "ingredients",
      docId: ingredientToCreate.id,
      newDatas: ingredientToCreate,
    });
    setNewIngredient("");

    setCocktail({
      ...cocktail,
      ingredients: [...cocktail.ingredients, ingredientToCreate],
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
        />
        <TextInput
          label="Ingrédients de votre cocktail"
          mode="outlined"
          value={newIngredient}
          onChangeText={(e) => {
            setNewIngredient(e);
            handleAvailableIngredientsChange(e);
          }}
        />

        {newIngredient && (
          <View
            style={{
              position: "absolute",
              top: 115,
              left: 0,
              zIndex: 1000,
              margin: 10,
              backgroundColor: "white",
              width: "100%",
            }}
          >
            <ScrollView
              style={{
                maxHeight: 200,
              }}
            >
              {availableIngredients.length > 0 ? (
                availableIngredients.map((ingredient) => (
                  <Pressable
                    key={ingredient.id}
                    onPress={() => handleAddIngredient(ingredient)}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: 10,
                      }}
                    >
                      <Text>{ingredient.name}</Text>
                    </View>
                  </Pressable>
                ))
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 10,
                  }}
                >
                  <Button
                    onPress={() => {
                      handleCreateNewIngredient();
                    }}
                  >
                    Aucun ingrédient trouvé, appuyez pour ajouter
                  </Button>
                </View>
              )}
            </ScrollView>
          </View>
        )}
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
                icon="close"
                theme={{
                  colors: {
                    primary: "#180828",
                  },
                }}
              >
                <Text>{ingredient.name}</Text>
              </Chip>
            ))}
          </View>
        )}
        <TextInput
          label="Description de votre cocktail"
          mode="outlined"
          value={cocktail.description}
          onChangeText={(e) => {
            setCocktail({ ...cocktail, description: e });
          }}
        />

        <Button
          onPress={() => handleAddCocktail()}
          style={{
            marginTop: 10,
          }}
          mode="contained"
        >
          Créer mon cocktail
        </Button>
        <Modal
          visible={modalVisible}
          onDismiss={() => {
            setModalVisible(false);
            navigation.navigate("home");
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 5,
              margin: 20,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
              }}
              variant="titleMedium"
            >
              Votre cocktail a bien été créé
            </Text>
            <Text
              style={{
                textAlign: "center",
              }}
            >
              Vous pouvez désormais retrouver{" "}
              <Text
                style={{
                  fontWeight: "bold",
                  marginTop: 10,
                }}
              >
                {cocktail.name}
              </Text>{" "}
              dans la liste des cocktails
            </Text>
            <Button
              style={{
                marginTop: 10,
              }}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("home");
              }}
              mode="contained"
            >
              Retour à l'accueil
            </Button>
          </View>
        </Modal>
      </View>
    </PageLayout>
  );
};

export default New;
