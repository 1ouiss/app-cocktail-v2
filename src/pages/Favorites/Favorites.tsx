import { StyleSheet, Text, View } from "react-native";
import { NavigationProps } from "../../../types/types";
import Navigation from "../../components/Navigation";

const Favorites: React.FC<NavigationProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Favorites</Text>
      <Navigation navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Favorites;
