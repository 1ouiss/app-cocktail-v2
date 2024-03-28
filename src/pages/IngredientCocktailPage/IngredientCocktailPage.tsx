import { NavigationProp } from "@react-navigation/native";
import { IconArrowLeft } from "@tabler/icons-react-native";
import { useContext, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { DatabaseContext } from "../../context/DatabaseContext";
import { Cocktails } from "../../../types/types";
import CocktailCard from "../../components/CocktailCard/CocktailCard";

const IngredientCocktailPage = ({
  route,
  navigation,
}: {
  route: any;
  navigation: NavigationProp<any>;
}) => {
  const { cocktails } = useContext(DatabaseContext);
  const { ingredient } = route.params;

  const [availableCocktails, setAvailableCocktails] = useState<Cocktails>([]);

  useEffect(() => {
    const filteredCocktails = getFilteredCocktails();

    if (filteredCocktails.length > 0) {
      console.log(filteredCocktails);

      setAvailableCocktails(filteredCocktails);
    }
  }, [ingredient]);

  const getFilteredCocktails = () => {
    return cocktails.filter((cocktail) => {
      return cocktail.ingredients.some(
        (cocktailIngredient) => cocktailIngredient.id === ingredient.id
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <IconArrowLeft size={24} />
        </Pressable>
        <Text variant="titleLarge">{ingredient.name}</Text>
      </View>
      <ScrollView
        style={{
          width: "100%",
          padding: 10,
        }}
      >
        <Text variant="headlineSmall">
          Les cocktails disponibles avec :{" "}
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            {ingredient.name}
          </Text>
        </Text>
        <View
          style={{
            paddingBottom: 100,
          }}
        >
          {availableCocktails.map((cocktail) => (
            <Pressable
              onPress={() =>
                navigation.navigate("cocktail", {
                  cocktail,
                })
              }
              key={cocktail.id}
            >
              <CocktailCard cocktail={cocktail} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    height: "100%",
    paddingTop: 100,
    position: "relative",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    padding: 10,
    gap: 10,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingLeft: 20,
    position: "absolute",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
});

export default IngredientCocktailPage;
