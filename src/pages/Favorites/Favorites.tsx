import { Pressable, ScrollView, View } from "react-native";
import { CocktailType, NavigationProps } from "../../../types/types";
import PageLayout from "../../components/PageLayout/PageLayout";
import { useContext } from "react";
import { DatabaseContext } from "../../context/DatabaseContext";
import CocktailCard from "../../components/CocktailCard/CocktailCard";
import { Button, Text } from "react-native-paper";

const Favorites: React.FC<NavigationProps> = ({ navigation }) => {
  const { user, cocktails } = useContext(DatabaseContext);
  return (
    <PageLayout navigation={navigation}>
      <View
        style={{
          width: "100%",
          height: "100%",
          padding: 10,
        }}
      >
        <Text
          variant="headlineLarge"
          style={{
            fontWeight: "600",
          }}
        >
          Vos cocktails favoris
        </Text>
        {user?.favorites && user?.favorites.length > 0 ? (
          user?.favorites.map((favorite) => (
            <Pressable
              onPress={() =>
                navigation.navigate("cocktail", {
                  cocktail: cocktails.find(
                    (cocktail) => cocktail.id === favorite
                  ) as CocktailType,
                })
              }
              key={favorite}
            >
              <CocktailCard
                key={favorite}
                cocktail={
                  cocktails.find(
                    (cocktail) => cocktail.id === favorite
                  ) as CocktailType
                }
              />
            </Pressable>
          ))
        ) : (
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: 200,
            }}
          >
            <Text
              variant="titleMedium"
              style={{
                textAlign: "center",
              }}
            >
              Vous n'avez pas encore de cocktails coup de coeur !
            </Text>
            <Button
              mode="contained"
              onPress={() => navigation.navigate("home")}
            >
              Voir les cocktails
            </Button>
          </View>
        )}

        <Text
          variant="headlineLarge"
          style={{
            fontWeight: "600",
          }}
        >
          Notre sélection
        </Text>

        <ScrollView horizontal>
          {cocktails.slice(0, 4).map((cocktail) => (
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
    </PageLayout>
  );
};

export default Favorites;
