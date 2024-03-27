import { Pressable, StyleSheet, Text, View } from "react-native";
import { Cocktails, NavigationProps } from "../../../types/types";
import PageLayout from "../../components/PageLayout/PageLayout";
import { TextInput, Title } from "react-native-paper";
import { useContext, useEffect, useState } from "react";
import { DatabaseContext } from "../../context/DatabaseContext";
import CocktailCard from "../../components/CocktailCard/CocktailCard";
// import CreateDataInDb from "../../components/CreateDataInDb";

const Home: React.FC<NavigationProps> = ({ navigation }) => {
  const { cocktails } = useContext(DatabaseContext);
  const [filterableCocktails, setFilterableCocktails] = useState<Cocktails>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setFilterableCocktails(cocktails);
  }, [cocktails]);

  return (
    <PageLayout navigation={navigation}>
      <>
        <View
          style={{
            padding: 10,
          }}
        >
          <TextInput
            label="Rechercher un cocktail"
            mode="outlined"
            value={search}
            onChangeText={(text) => {
              setSearch(text);
              const filteredCocktails = cocktails.filter((cocktail) => {
                const cocktailName = cocktail.name.toLowerCase();
                const searchValue = text.toLowerCase();
                const cocktailIngredients = cocktail.ingredients.map(
                  (ingredient) => ingredient.name?.toLowerCase()
                );
                const cleanCocktailIngredients = cocktailIngredients.filter(
                  (ingredient) => ingredient !== undefined
                );

                if (
                  cocktailName.includes(searchValue) ||
                  cleanCocktailIngredients.some((ingredient) =>
                    ingredient.includes(searchValue)
                  )
                ) {
                  return true;
                }
              });
              setFilterableCocktails(filteredCocktails);
            }}
          />
        </View>
        {/* <CreateDataInDb /> */}
        {filterableCocktails.map((cocktail) => (
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
      </>
    </PageLayout>
  );
};

export default Home;
