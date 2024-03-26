import { StyleSheet, Text, View } from "react-native";
import Navigation from "../../components/Navigation";
import { NavigationProps } from "../../../types/types";
import PageLayout from "../../components/PageLayout/PageLayout";

const Home: React.FC<NavigationProps> = ({ navigation }) => {
  return (
    <PageLayout navigation={navigation}>
      <>
        <Text>Home</Text>
      </>
    </PageLayout>
  );
};

export default Home;
