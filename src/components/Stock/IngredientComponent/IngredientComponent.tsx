import React, { useContext } from "react";
import { Text, IconButton } from "react-native-paper";
import { IngredientType } from "../../../../types/types";
import { ImageBackground, Pressable, View } from "react-native";
import { updateDoc } from "../../../database/set";
import { DatabaseContext } from "../../../context/DatabaseContext";
import { NavigationProp } from "@react-navigation/native";

const IngredientComponent = ({
  ingredient,
  navigation,
}: {
  ingredient: IngredientType;
  navigation: NavigationProp<any>;
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
    <Pressable
      onPress={() => {
        navigation.navigate("ingredientwithcocktail", {
          ingredient,
        });
      }}
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
      <ImageBackground
        src={
          ingredient?.image
            ? ingredient?.image
            : "https://firebasestorage.googleapis.com/v0/b/app-cocktails.appspot.com/o/cocktails%2Fnot_found.jpeg?alt=media&token=b3be89b1-3c70-4aed-bd3a-6bebd36a7c2c"
        }
        style={{
          width: 70,
          height: 70,
        }}
        resizeMode="cover"
      />
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
    </Pressable>
  );
};

export default IngredientComponent;
