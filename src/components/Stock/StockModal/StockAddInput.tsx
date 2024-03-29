import React, { useContext, useEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import {
  CocktailType,
  IngredientType,
  Ingredients,
} from "../../../../types/types";
import { DatabaseContext } from "../../../context/DatabaseContext";
import { Button, Chip, Text, TextInput } from "react-native-paper";
import { updateDoc } from "../../../database/set";
import { IconPlus } from "@tabler/icons-react-native";

const StockAddInput = () => {
  const { user, ingredients } = useContext(DatabaseContext);

  const [newIngredient, setNewIngredient] = useState<string>("");
  const [availableIngredients, setAvailableIngredients] = useState<
    IngredientType[]
  >([]);

  const handleAvailableIngredientsChange = (e: string) => {
    if (e === "") {
      setAvailableIngredients([]);
      return;
    }
    const filteredIngredients = ingredients.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(e.toLowerCase())
    );
    setAvailableIngredients(filteredIngredients);
  };

  const handleValidate = async (ingredient: IngredientType) => {
    try {
      await updateDoc({
        collectionId: "users",
        docId: user?.id,
        newDatas: {
          ...user,
          stock: [...(user?.stock ?? []), ingredient],
        },
      });
      setNewIngredient("");
    } catch (e) {
      console.log(e);
    }
  };

  const handleCreateNewIngredient = async () => {
    const formattedName =
      newIngredient.charAt(0).toUpperCase() +
      newIngredient
        .slice(1)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trimEnd();

    const ingredientToCreate: IngredientType = {
      id: formattedName.toLowerCase().split(" ").join("_"),
      name: formattedName,
    };

    try {
      await updateDoc({
        collectionId: "ingredients",
        docId: ingredientToCreate.id,
        newDatas: ingredientToCreate,
      });
      setNewIngredient("");
      await updateDoc({
        collectionId: "users",
        docId: user?.id,
        newDatas: {
          ...user,
          stock: [...(user?.stock ?? []), ingredientToCreate],
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{ zIndex: 10000 }}>
      <TextInput
        label="Ingrédients de votre cocktail"
        mode="outlined"
        value={newIngredient}
        onChangeText={(e) => {
          setNewIngredient(e);
          handleAvailableIngredientsChange(e);
        }}
        style={{
          width: "100%",
          zIndex: 10000,
        }}
        onSubmitEditing={() => {
          handleCreateNewIngredient();
        }}
      />

      {newIngredient && (
        <View
          style={{
            position: "absolute",
            top: 48,
            left: 0,
            zIndex: 100000000,
            marginTop: 10,
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
                  onPress={() => handleValidate(ingredient)}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: 20,
                    }}
                  >
                    <Text>{ingredient.name}</Text>
                    <IconPlus size={20} />
                  </View>
                </Pressable>
              ))
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 20,
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
    </View>
  );
};

export default StockAddInput;
