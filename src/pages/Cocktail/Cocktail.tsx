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
import { IngredientType } from "../../../types/types";

const Cocktail = ({
  route,
  navigation,
}: {
  route: any;
  navigation: NavigationProp<any>;
}) => {
  const { cocktail } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <IconArrowLeft size={24} />
        </Pressable>
        <Text variant="titleLarge">{cocktail.name}</Text>
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
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            height: 400,
            borderRadius: 16,
          }}
        >
          <ImageBackground
            source={{ uri: cocktail.image }}
            imageStyle={{ borderRadius: 16 }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 24,
            }}
            resizeMode="cover"
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
          }}
        >
          {cocktail.ingredients.map((ingredient: IngredientType) => (
            <Chip key={ingredient.id}>{ingredient.name}</Chip>
          ))}
        </View>
        <Text>{cocktail.description}</Text>
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
