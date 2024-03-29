import { NavigationProp } from "@react-navigation/native";
import { IconArrowBack, IconArrowLeft } from "@tabler/icons-react-native";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Chip, Text } from "react-native-paper";
import { CocktailType, IngredientType } from "../../../types/types";

const Cocktail = ({
  route,
  navigation,
}: {
  route: any;
  navigation: NavigationProp<any>;
}) => {
  const { cocktail } = route.params as { cocktail: CocktailType };

  const formatDescription = (description: string): string => {
    const maxLength = 80;
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + "...";
    }
    return description;
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <IconArrowLeft size={24} />
        </Pressable>
        <Text
          style={{ overflow: "hidden", maxWidth: "80%" }}
          variant="titleLarge"
          numberOfLines={1}
        >
          {cocktail.name}
        </Text>
      </View>
      <ScrollView
        style={{
          width: "100%",
          padding: 10,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              height: 400,
              borderRadius: 16,
            }}
          >
            <ImageBackground
              source={{
                uri: cocktail.image
                  ? cocktail.image
                  : "https://firebasestorage.googleapis.com/v0/b/app-cocktails.appspot.com/o/cocktails%2Fnot_found.jpeg?alt=media&token=b3be89b1-3c70-4aed-bd3a-6bebd36a7c2c",
              }}
              imageStyle={{ borderRadius: 16 }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 24,
              }}
              resizeMode="cover"
            />
          </View>
          <View>
            <Text variant="headlineLarge">{cocktail.name}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            {cocktail.ingredients.map((ingredient: IngredientType) => (
              <Pressable
                onPress={() => {
                  console.log(ingredient);

                  navigation.navigate("ingredientwithcocktail", {
                    ingredient,
                  });
                }}
              >
                <Chip key={ingredient.id}>{ingredient.name}</Chip>
              </Pressable>
            ))}
          </View>
          <View>
            <Text variant="bodyMedium">{cocktail.description}</Text>
          </View>
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

export default Cocktail;
