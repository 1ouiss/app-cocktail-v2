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
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 6,
        display: "flex",
        flexDirection: "column",
        width: 95,
        height: 130,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ width: 70, height: 70, backgroundColor: "blue" }} />
      <Text style={{ marginTop: 10 }}>{ingredient.name}</Text>
      <IconButton
        style={{
          position: "absolute",
          top: -20,
          right: -20,
          backgroundColor: "red",
          width: 30,
          height: 30,
        }}
        size={18}
        iconColor="white"
        icon="delete"
        onPress={() => onPressDelete(ingredient.id)}
      />
    </View>
  );
};

export default IngredientComponent;
