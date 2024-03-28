import PageLayout from "../../components/PageLayout/PageLayout";
import { CocktailType, NavigationProps } from "../../../types/types";
import StockList from "../../components/Stock/StockList/StockList";
import { Text } from "react-native-paper";
import { Pressable, ScrollView, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import CocktailCard from "../../components/CocktailCard/CocktailCard";
import { DatabaseContext } from "../../context/DatabaseContext";

const Stock: React.FC<NavigationProps> = ({ navigation }) => {
  const { user, cocktails } = useContext(DatabaseContext);

  const [availableCocktails, setAvailableCocktails] = useState<CocktailType[]>(
    []
  );

  useEffect(() => {
    if (user) {
      const ingredientIds = user.stock.map((ingredient) => ingredient.id);
      const filteredCocktails = cocktails.filter((cocktail) => {
        const cocktailsIngredientsIds = cocktail.ingredients.map(
          (ingredient) => ingredient.id
        );
        return ingredientIds.every((id) =>
          cocktailsIngredientsIds.includes(id)
        );
      });

      setAvailableCocktails(filteredCocktails);
    }
  }, [user, cocktails]);
  return (
    <PageLayout navigation={navigation}>
      <>
        <StockList />
        <View
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <Text
            variant="headlineLarge"
            style={{
              fontWeight: "600",
              padding: 10,
            }}
          >
            Vos cocktails disponibles
          </Text>

          <ScrollView horizontal>
            {availableCocktails.map((cocktail) => (
              <View
                style={{
                  maxWidth: 300,
                  minWidth: 300,
                }}
              >
                <Pressable
                  onPress={() =>
                    navigation.navigate("cocktail", {
                      cocktail,
                    })
                  }
                  key={cocktail.id}
                >
                  <CocktailCard
                    key={cocktail.id}
                    cocktail={cocktail}
                    showDescription={false}
                  />
                </Pressable>
              </View>
            ))}
          </ScrollView>
        </View>
      </>
    </PageLayout>
  );
};

export default Stock;
