import { Pressable, StyleSheet, View } from "react-native";
import { NavigationProps } from "../../../types/types";
import { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import {
  IconDatabase,
  IconHeart,
  IconHome,
  IconNewSection,
  IconUser,
} from "@tabler/icons-react-native";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    paddingBottom: 30,
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "space-around",
  },
});

const Navigation: React.FC<NavigationProps> = ({ navigation }) => {
  const route = useRoute();
  useEffect(() => {
    console.log("Navigation component mounted");
    console.log(navigation.isFocused());
    console.log(route);
  }, []);
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate("home")}>
        <IconHome
          size={26}
          color={route.name === "home" ? "#006FEE" : "black"}
        />
      </Pressable>
      <Pressable onPress={() => navigation.navigate("stock")}>
        <IconDatabase
          size={26}
          color={route.name === "stock" ? "#006FEE" : "black"}
        />
      </Pressable>
      <Pressable onPress={() => navigation.navigate("new")}>
        <IconNewSection
          size={26}
          color={route.name === "new" ? "#006FEE" : "black"}
        />
      </Pressable>
      <Pressable onPress={() => navigation.navigate("favorites")}>
        <IconHeart
          size={26}
          color={route.name === "favorites" ? "#006FEE" : "black"}
        />
      </Pressable>
      <Pressable onPress={() => navigation.navigate("user")}>
        <IconUser
          size={26}
          color={route.name === "user" ? "#006FEE" : "black"}
        />
      </Pressable>
    </View>
  );
};

export default Navigation;
