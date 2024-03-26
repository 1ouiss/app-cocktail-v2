import { Text } from "react-native";
import { NavigationProps } from "../../../types/types";
import PageLayout from "../../components/PageLayout/PageLayout";

const Favorites: React.FC<NavigationProps> = ({ navigation }) => {
  return (
    <PageLayout navigation={navigation}>
      <>
        <Text>Favorites</Text>
      </>
    </PageLayout>
  );
};

export default Favorites;
