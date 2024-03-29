import { Text } from "react-native";
import { NavigationProps } from "../../../types/types";
import PageLayout from "../../components/PageLayout/PageLayout";
import Navigation from "../../components/Navigation";
import UserComponent from "../../components/User";

const User: React.FC<NavigationProps> = ({ navigation }) => {
  return (
    <PageLayout navigation={navigation}>
      <>
        <UserComponent navigation={navigation} />
      </>
    </PageLayout>
  );
};

export default User;
