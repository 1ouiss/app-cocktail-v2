import React, { useContext } from "react";
import { Text, IconButton } from "react-native-paper";
import { IngredientType } from "../../../../types/types";
import { View } from "react-native";
import { updateDoc } from "../../../database/set";
import { DatabaseContext } from "../../../context/DatabaseContext";

const IngredientComponent = ({
  ingredient,
}: {
  ingredient: IngredientType;
}) => {
  const { user } = useContext(DatabaseContext);
  const onPressDelete = async (id: string) => {
    console.log(id);

    try {
      const updatedStock = user?.stock.filter(
        (item) => item.id !== ingredient.id
      );
      await updateDoc({
        collectionId: "users",
        docId: user?.id,
        newDatas: {
          ...user,
          stock: updatedStock,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View
      style={{
        padding: 10,
        margin: 10,
        backgroundColor: "grey",
        borderRadius: 6,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ width: 100, height: 100, backgroundColor: "red" }} />
      <Text>{ingredient.name}</Text>
      <IconButton icon="delete" onPress={() => onPressDelete(ingredient.id)} />
    </View>
  );
};

export default IngredientComponent;
