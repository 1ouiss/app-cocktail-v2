import { StyleSheet, View } from "react-native";
import Navigation from "../Navigation";
import { NavigationProp } from "@react-navigation/native";

type PageLayoutProps = {
  children: JSX.Element;
  navigation: NavigationProp<any>;
};

const PageLayout = ({ children, navigation }: PageLayoutProps) => {
  return (
    <View style={styles.container}>
      {children}
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

export default PageLayout;
