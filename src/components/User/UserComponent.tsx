import { useContext } from "react";
import { Button, Text } from "react-native-paper";
import { DatabaseContext } from "../../context/DatabaseContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserComponent = () => {
  const { user, setUser, setIsSigned } = useContext(DatabaseContext);

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem("user");
    } catch (e) {
      console.log(e);
    }
    console.log("Done.");
  };
  const handleDisconnect = () => {
    removeValue();
    setIsSigned(false);
    setUser && setUser(undefined);
  };

  return (
    <>
      <Text>{user?.firstName}</Text>
      <Text>{user?.lastName}</Text>
      <Text>{user?.email}</Text>
      {user?.favorites.map((favorite, index) => (
        <Text key={index}>{favorite.name}</Text>
      ))}

      <Button onPress={handleDisconnect}>Logout</Button>
    </>
  );
};

export default UserComponent;
