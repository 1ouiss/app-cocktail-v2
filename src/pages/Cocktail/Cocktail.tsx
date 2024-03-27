import { NavigationProp } from "@react-navigation/native";
import { IconArrowBack, IconArrowLeft } from "@tabler/icons-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

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
        <Pressable onPress={() => navigation.navigate("home")}>
          <IconArrowLeft size={24} />
        </Pressable>
        <Text variant="titleLarge">{cocktail.name}</Text>
      </View>
      <Text>{cocktail.name}</Text>
      <Button onPress={() => navigation.navigate("home")}>Go back</Button>
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
