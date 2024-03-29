import { Animated, Pressable, StyleSheet, View } from "react-native";
import { NavigationProps } from "../../../types/types";
import { useContext, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import {
  IconDatabase,
  IconHeart,
  IconHome,
  IconNewSection,
  IconBox,
  IconUser,
} from "@tabler/icons-react-native";
import { DatabaseContext } from "../../context/DatabaseContext";
import { Text } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    paddingBottom: 30,
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "space-around",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
});

const Navigation: React.FC<NavigationProps> = ({ navigation }) => {
  const route = useRoute();
  const { user } = useContext(DatabaseContext);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate("home")}>
        <IconHome
          size={26}
          color={route.name === "home" ? "#006FEE" : "black"}
        />
      </Pressable>
      <Pressable onPress={() => navigation.navigate("stock")}>
        <IconBox
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
          fill={
            route.name === "favorites" &&
            (!user || !user.favorites || user.favorites.length === 0)
              ? "none"
              : route.name !== "favorites" &&
                user &&
                user.favorites &&
                user.favorites.length > 0
              ? "black"
              : route.name === "favorites"
              ? "#006FEE"
              : "none"
          }
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
