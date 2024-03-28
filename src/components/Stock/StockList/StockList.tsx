import { AnimatedFAB, Modal, Text, TextInput } from "react-native-paper";
import { CocktailType, Ingredients } from "../../../../types/types";
import { Pressable, StyleSheet, View } from "react-native";
import React, { useContext, useState } from "react";
import { DatabaseContext } from "../../../context/DatabaseContext";
import IngredientComponent from "../IngredientComponent/IngredientComponent";
import { IconPlus } from "@tabler/icons-react-native";
import StockModal from "../StockModal";
import { NavigationProp } from "@react-navigation/native";

const StockList = ({
  showModal,
  navigation,
}: {
  showModal: () => void;
  navigation: NavigationProp<any>;
}) => {
  const { user } = useContext(DatabaseContext);
  const styles = StyleSheet.create({
    button: {
      borderRadius: 50,
      padding: 10,
      zIndex: 10,
      backgroundColor: "blue",
    },
    text: {
      textAlign: "center",
      padding: 10,
      color: "black",
    },
    headerStock: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
    },
  });

  return (
    <View style={{ padding: 20 }}>
      <View style={styles.headerStock}>
        <Text style={{ fontSize: 25 }}>Votre stock</Text>
      </View>
      <StockModal />
      {user?.stock.length === 0 && (
        <Text style={styles.text}>Votre stock est vide</Text>
      )}
      <View
        style={{
          borderRadius: 6,
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          margin: "auto",
          marginTop: 10,
          // backgroundColor: "red",
        }}
      >
        {user?.stock.map((ingredient, index) => (
          <View key={index}>
            <IngredientComponent
              navigation={navigation}
              ingredient={ingredient}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default StockList;
