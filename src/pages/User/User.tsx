import { Text } from "react-native";
import { NavigationProps } from "../../../types/types";
import PageLayout from "../../components/PageLayout/PageLayout";
import Navigation from "../../components/Navigation";

const User: React.FC<NavigationProps> = ({ navigation }) => {
  return (
    <PageLayout navigation={navigation}>
      <>
        <Text>User</Text>
      </>
    </PageLayout>
  );
};

export default User;
