import PageLayout from "../../components/PageLayout/PageLayout";
import { CocktailType, NavigationProps } from "../../../types/types";
import StockList from "../../components/Stock/StockList/StockList";
import { Modal, Text } from "react-native-paper";
import { Pressable, ScrollView, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import CocktailCard from "../../components/CocktailCard/CocktailCard";
import { DatabaseContext } from "../../context/DatabaseContext";
import StockModal from "../../components/Stock/StockModal";

const Stock: React.FC<NavigationProps> = ({ navigation }) => {
  const { user, cocktails } = useContext(DatabaseContext);

  const [availableCocktails, setAvailableCocktails] = useState<CocktailType[]>(
    []
  );
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    zIndex: 1000,
  };

  useEffect(() => {
    if (user) {
      const ingredientIds = user.stock.map((ingredient) => ingredient.id);
      const filteredCocktails = cocktails.filter((cocktail) => {
        const cocktailIngredientIds = cocktail.ingredients.map(
          (ingredient) => ingredient.id
        );
        return cocktailIngredientIds.some((id) => ingredientIds.includes(id));
      });

      setAvailableCocktails(filteredCocktails);
    }
  }, [user, cocktails]);

  return (
    <PageLayout navigation={navigation}>
      <>
        <StockList showModal={showModal} navigation={navigation} />
        <View
          style={{
            width: "100%",
            height: "100%",
            zIndex: -10,
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
