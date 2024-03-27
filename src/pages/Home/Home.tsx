import { StyleSheet, Text, View } from "react-native";
import { NavigationProps } from "../../../types/types";
import PageLayout from "../../components/PageLayout/PageLayout";
import { Title } from "react-native-paper";
import { useContext } from "react";
import { DatabaseContext } from "../../context/DatabaseContext";
import CocktailCard from "../../components/CocktailCard/CocktailCard";
// import CreateDataInDb from "../../components/CreateDataInDb";

const Home: React.FC<NavigationProps> = ({ navigation }) => {
  const { cocktails } = useContext(DatabaseContext);
  return (
    <PageLayout navigation={navigation}>
      <>
        {/* <CreateDataInDb /> */}
        {cocktails.map((cocktail) => (
          <CocktailCard cocktail={cocktail} key={cocktail.id} />
        ))}
      </>
    </PageLayout>
  );
};

export default Home;
