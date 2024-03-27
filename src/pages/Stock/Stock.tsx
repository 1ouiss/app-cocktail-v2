import { Text } from "react-native";
import PageLayout from "../../components/PageLayout/PageLayout";
import { NavigationProps } from "../../../types/types";
import StockList from '../../components/Stock/StockList/StockList';


const Stock: React.FC<NavigationProps> = ({ navigation }) => {
  return (
    <PageLayout navigation={navigation}>
      <>
        <StockList />
      </>
    </PageLayout>
  );
};

export default Stock;
