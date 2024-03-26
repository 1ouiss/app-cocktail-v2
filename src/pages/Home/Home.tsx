import { StyleSheet, Text, View } from "react-native";
import Navigation from "../../components/Navigation";
import { NavigationProps } from "../../../types/types";

const Home: React.FC<NavigationProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
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

export default Home;
