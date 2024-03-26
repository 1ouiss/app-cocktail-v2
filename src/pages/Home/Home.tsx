import { StyleSheet, Text, View } from "react-native";
import { NavigationProps } from "../../../types/types";
import PageLayout from "../../components/PageLayout/PageLayout";
import { Title } from "react-native-paper";
// import CreateDataInDb from "../../components/CreateDataInDb";

const Home: React.FC<NavigationProps> = ({ navigation }) => {
  return (
    <PageLayout navigation={navigation}>
      <>
        <Title>Cocktelligence</Title>
        <Text>Home</Text>
        {/* <CreateDataInDb /> */}
      </>
    </PageLayout>
  );
};

export default Home;
