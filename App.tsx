import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Chip, PaperProvider } from "react-native-paper";
import { Cocktails, IngredientType, Ingredients } from "./types/types";
import data from "./data/datas.json";
import Routes from "./src/routes";
import { collection, getDocs } from "firebase/firestore";
import { updateDoc } from "./src/database/set";
import { getDbDocs } from "./src/database/read";
import { DatabaseContextProvider } from "./src/context/DatabaseContext";
import { theme } from "./src/theme/theme";
import { LogBox } from "react-native";

// export default function App() {
//   const [selectedIngredient, setSelectedIngredient] = useState<Ingredients>([]);

//   const [availableCocktails, setAvailableCocktails] = useState<Cocktails>([]);

//   const handleAddIngredient = (ingredient: IngredientType) => {
//     if (selectedIngredient.includes(ingredient)) {
//       setSelectedIngredient(
//         selectedIngredient.filter((item) => item !== ingredient)
//       );
//       return;
//     }
//     setSelectedIngredient([...selectedIngredient, ingredient]);
//   };

//   const handleSearchCocktail = () => {
//     if (selectedIngredient.length === 0) return;
//     // check if the ingredient is in the cocktail
//     const ingredientIds = selectedIngredient.map((ingredient) => ingredient.id);
//     const cocktails = data.cocktails.filter((cocktail) => {
//       const cocktailsIngredientsIds = cocktail.ingredients.map(
//         (ingredient) => ingredient.id
//       );
//       return ingredientIds.every((id) => cocktailsIngredientsIds.includes(id));
//     });
//     console.log(cocktails);

//     setAvailableCocktails(cocktails);
//   };

//   return (
//     <PaperProvider>
//       <View style={styles.container}>
//         {/* <FormChoice /> */}
//         <View
//           style={{
//             flexDirection: "row",
//             flexWrap: "wrap",
//           }}
//         >
//           {data.ingredients.map((ingredient) => (
//             <Chip
//               key={ingredient.id}
//               style={{ margin: 5 }}
//               mode={
//                 selectedIngredient.includes(ingredient) ? "flat" : "outlined"
//               }
//               onPress={() => handleAddIngredient(ingredient)}
//             >
//               <Text>{ingredient.name}</Text>
//             </Chip>
//           ))}
//         </View>

//         <Button mode="contained" onPress={() => handleSearchCocktail()}>
//           Rechercher un cocktail
//         </Button>

//         {availableCocktails &&
//           availableCocktails.map((cocktail) => (
//             <View key={cocktail.id}>
//               <Text>{cocktail.name}</Text>
//               <Text>{cocktail.description}</Text>
//             </View>
//           ))}
//       </View>
//     </PaperProvider>
//   );import { collection, getDocs } from "firebase/firestore";

export default function App() {
  LogBox.ignoreAllLogs(true);
  useEffect(() => {
    getCocktails();
  }, []);

  const getCocktails = async () => {
    const cocktails = await getDbDocs({
      collectionId: "cocktails",
    });
    console.log(cocktails);
  };
  return (
    <PaperProvider theme={theme()}>
      <DatabaseContextProvider>
        <Routes />
      </DatabaseContextProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
