import { AnimatedFAB, Modal, Text, TextInput } from "react-native-paper";
import { CocktailType, Ingredients } from "../../../../types/types";
import { Pressable, StyleSheet, View } from "react-native";
import React, { useContext, useState } from "react";
import { DatabaseContext } from "../../../context/DatabaseContext";
import StockModal from "../StockModal";
import IngredientComponent from "../IngredientComponent/IngredientComponent";
import { IconPlus } from "@tabler/icons-react-native";

const StockList = () => {
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
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
    },
  });
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [isExtended, setIsExtended] = React.useState(true);
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    zIndex: 1000,
  };

  return (
    <View style={{ minHeight: "100%" }}>
      <View style={styles.headerStock}>
        <Text>Votre stock</Text>
        <Pressable style={styles.button} onPress={showModal}>
          <IconPlus size={26} color={"#FFF"} />
        </Pressable>
      </View>
      {user?.stock.map((ingredient, index) => (
        <View key={index}>
          <IngredientComponent ingredient={ingredient} />
        </View>
      ))}

      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        <StockModal hideModal={hideModal} />
      </Modal>
    </View>
  );
};

export default StockList;
