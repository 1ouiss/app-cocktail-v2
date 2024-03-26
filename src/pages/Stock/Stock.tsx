import { Text } from "react-native";
import PageLayout from "../../components/PageLayout/PageLayout";
import { NavigationProps } from "../../../types/types";

const Stock: React.FC<NavigationProps> = ({ navigation }) => {
  return (
    <PageLayout navigation={navigation}>
      <>
        <Text>Stock</Text>
      </>
    </PageLayout>
  );
};

export default Stock;
