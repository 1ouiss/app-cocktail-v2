import { Button, StyleSheet, View } from "react-native";
import { NavigationProps } from "../../../types/types";

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
  return (
    <View style={styles.container}>
      <Button title="home" onPress={() => navigation.navigate("Home")} />
      <Button
        title="favorites"
        onPress={() => navigation.navigate("Favorites")}
      />
    </View>
  );
};

export default Navigation;
