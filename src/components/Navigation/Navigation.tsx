import { Button, StyleSheet, View } from "react-native";
import { NavigationProps } from "../../../types/types";
import { useEffect } from "react";
import { useRoute } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "red",
    alignItems: "center",
    paddingBottom: 50,
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "space-between",
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
      <Button title="home" onPress={() => navigation.navigate("Home")} />
      <Button title="stock" onPress={() => navigation.navigate("Stock")} />
      <Button title="New" onPress={() => navigation.navigate("New")} />
      <Button
        title="favorites"
        onPress={() => navigation.navigate("Favorites")}
      />
      <Button title="user" onPress={() => navigation.navigate("User")} />
    </View>
  );
};

export default Navigation;
