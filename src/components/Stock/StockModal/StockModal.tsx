import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { IngredientType, Ingredients } from "../../../../types/types";
import { DatabaseContext } from "../../../context/DatabaseContext";
import { Button, Chip, Text, TextInput } from "react-native-paper";
import { updateDoc } from "../../../database/set";

const StockModal = ({ hideModal }: { hideModal: () => void }) => {
  const { ingredients, user } = useContext(DatabaseContext);
  const [search, setSearch] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredients>(
    []
  );
  const [filteredIngredients, setFilteredIngredients] = useState<Ingredients>(
    []
  );

  useEffect(() => {
    setSelectedIngredients(user?.stock || []);
  }, []);

  useEffect(() => {
    const filtered = ingredients.filter(
      (ingredient) => !user?.stock.some((item) => item.id === ingredient.id)
    );
    setFilteredIngredients(filtered);
  }, [user?.stock, ingredients]);

  const handleAddIngredient = (ingredient: IngredientType) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients((prevSelectedIngredients) => [
        ...prevSelectedIngredients,
        ingredient,
      ]);
    }
  };

  const filterIngredients = (text: string) => {
    setSearch(text);
    if (text.trim() === "") {
      setFilteredIngredients(
        ingredients.filter(
          (ingredient) =>
            !selectedIngredients.some((item) => item.id === ingredient.id)
        )
      );
    } else {
      const filtered = ingredients.filter(
        (ingredient) =>
          ingredient.name.toLowerCase().includes(text.toLowerCase()) &&
          !selectedIngredients.some((item) => item.id === ingredient.id)
      );
      setFilteredIngredients(filtered);
    }
  };

  const handleValidate = async () => {
    hideModal();
    try {
      await updateDoc({
        collectionId: "users",
        docId: user?.id,
        newDatas: {
          ...user,
          stock: selectedIngredients,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{ minHeight: "100%" }}>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        <TextInput
          label="Ajouter un ingrédient"
          mode="outlined"
          value={search}
          onChangeText={filterIngredients}
        />

        {filteredIngredients.map((ingredient) => (
          <Chip
            key={ingredient.id}
            style={{ margin: 5 }}
            mode={
              selectedIngredients.includes(ingredient) ? "flat" : "outlined"
            }
            onPress={() => handleAddIngredient(ingredient)}
          >
            <Text>{ingredient.name}</Text>
          </Chip>
        ))}
        <Button mode="contained" onPress={handleValidate}>
          Valider
        </Button>
      </View>
    </View>
  );
};

export default StockModal;
