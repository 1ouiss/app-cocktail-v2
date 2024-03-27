import { Text } from "react-native-paper";
import { CocktailType } from "../../../types/types";
import { ImageBackground, View } from "react-native";

const CocktailCard = ({ cocktail }: { cocktail: CocktailType }) => {
  return (
    <View
      style={{
        padding: 10,
        margin: 10,
        backgroundColor: "grey",
        borderRadius: 6,
        display: "flex",
        flexDirection: "row",
        gap: 10,
      }}
    >
      <View style={{ width: 100, height: 100, backgroundColor: "red" }}>
        <ImageBackground
          source={{ uri: cocktail.image }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text variant="headlineSmall">{cocktail.name}</Text>
        <Text variant="bodyMedium">{cocktail.description}</Text>
      </View>
    </View>
  );
};

export default CocktailCard;
