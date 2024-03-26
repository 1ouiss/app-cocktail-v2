import { NavigationProp } from "@react-navigation/native";
import { Text } from "react-native";

type Props = {
  navigation: NavigationProp<any>;
};

const Favorites: React.FC<Props> = ({ navigation }) => {
  return (
    <>
      <Text>Favorites</Text>
    </>
  );
};

export default Favorites;
