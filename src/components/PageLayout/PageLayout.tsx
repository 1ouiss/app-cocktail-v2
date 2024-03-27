import { ScrollView, StyleSheet, View } from "react-native";
import Navigation from "../Navigation";
import { NavigationProp, useRoute } from "@react-navigation/native";
import { Text } from "react-native-paper";

type PageLayoutProps = {
  children: JSX.Element;
  navigation: NavigationProp<any>;
};

const PageLayout = ({ children, navigation }: PageLayoutProps) => {
  const route = useRoute();
  return (
    <View style={styles.container}>
      {route.name !== "login" && (
        <View style={styles.header}>
          <Text variant="titleLarge">Cocktelligence</Text>
        </View>
      )}
      <ScrollView
        style={{
          width: "100%",
          height: "100%",
          marginBottom: 80,
        }}
      >
        {children}
      </ScrollView>
      {route.name !== "login" && <Navigation navigation={navigation} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    height: "100%",
    paddingTop: 100,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    padding: 10,
    backgroundColor: "#f0f0f0",
    paddingTop: 60,
    position: "absolute",
  },
});

export default PageLayout;
