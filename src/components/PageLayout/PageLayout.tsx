import { ScrollView, StyleSheet, View } from "react-native";
import Navigation from "../Navigation";
import { NavigationProp, useRoute } from "@react-navigation/native";
import { Text } from "react-native-paper";
import { useEffect } from "react";

type PageLayoutProps = {
  children: JSX.Element;
  navigation: NavigationProp<any>;
};

const PageLayout = ({ children, navigation }: PageLayoutProps) => {
  const route = useRoute();

  return (
    <View style={styles.container}>
      {route.name !== "login" && (
        <View style={styles.header}>
          <Text variant="titleLarge">
            {route.name === "home"
              ? "Accueil"
              : route.name === "stock"
              ? "Mon stock"
              : route.name === "new"
              ? "Nouveau cocktail"
              : route.name === "favorites"
              ? "Favoris"
              : route.name === "user"
              ? "Profil"
              : route.name === "cocktail"
              ? "Cocktail"
              : route.name === "ingredientwithcocktail"
              ? "Cocktails avec cet ingrédient"
              : "Mon cocktail facile"}
          </Text>
        </View>
      )}
      <ScrollView
        style={{
          width: "100%",
          height: "100%",
          marginBottom: 80,
        }}
      >
        {children}
      </ScrollView>
      {route.name !== "login" && <Navigation navigation={navigation} />}
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
    justifyContent: "center",
    width: "100%",
    padding: 10,
    backgroundColor: "#fff",
    paddingTop: 60,
    position: "absolute",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
});

export default PageLayout;
