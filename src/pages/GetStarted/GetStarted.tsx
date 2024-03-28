import { Button, Text } from "react-native-paper";
import { NavigationProps } from "../../../types/types";
import { View } from "react-native";
import { IconGlassCocktail } from "@tabler/icons-react-native";

const GetStarted: React.FC<NavigationProps> = ({ navigation }) => {
  return (
    <View
      style={{
        backgroundColor: "#f0f0f0",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        gap: 10,
        flexDirection: "column",
      }}
    >
      <View>
        <IconGlassCocktail size={100} color="#000" />
      </View>
      <Text
        variant="headlineLarge"
        style={{
          fontWeight: "bold",
        }}
      >
        Mon cocktail facile
      </Text>

      <Text
        variant="titleMedium"
        style={{
          textAlign: "center",
        }}
      >
        L'application qui vous aide à réaliser vos cocktails de rêve
      </Text>

      <Button onPress={() => navigation.navigate("login")} mode="contained">
        Je crée mon cocktail
      </Button>
    </View>
  );
};

export default GetStarted;
