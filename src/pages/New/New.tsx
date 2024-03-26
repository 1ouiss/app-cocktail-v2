import { Text } from "react-native";
import PageLayout from "../../components/PageLayout/PageLayout";
import { NavigationProps } from "../../../types/types";

const New: React.FC<NavigationProps> = ({ navigation }) => {
  return (
    <PageLayout navigation={navigation}>
      <>
        <Text>New</Text>
      </>
    </PageLayout>
  );
};

export default New;
