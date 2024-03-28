import { useContext } from "react";
import { Avatar, Button, Text } from "react-native-paper";
import { DatabaseContext } from "../../context/DatabaseContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CocktailCard from "../CocktailCard/CocktailCard";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  red100,
  redA100,
} from "react-native-paper/lib/typescript/styles/themes/v2/colors";

const UserComponent = () => {
  const { user, setUser, setIsSigned, cocktails } = useContext(DatabaseContext);

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem("user");
    } catch (e) {
      console.log(e);
    }
    console.log("Done.");
  };

  const filteredCocktails = cocktails.filter(
    (cocktail) => cocktail.user === user?.id
  );

  console.log("cocktails", filteredCocktails);

  const handleDisconnect = () => {
    removeValue();
    setIsSigned(false);
    setUser && setUser(undefined);
  };

  return (
    <>
      <View style={styles.userPage}>
        <Avatar.Text
          size={64}
          label={`${user?.firstName.charAt(0)}${user?.lastName.charAt(0)}`}
        />
        <Text>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text>{user?.email}</Text>
        <Text style={styles.p}>Modifier le compte</Text>
        <Button onPress={handleDisconnect}>Logout</Button>
      </View>
      <View style={styles.listCocktails}>
        <Text>Les Cocktails que vous avez créé :</Text>
        {filteredCocktails.length === 0 ? (
          <Text>Vous n'avez pas encore créé de cocktails.</Text>
        ) : (
          filteredCocktails.map((cocktail, index) => (
            <CocktailCard key={index} cocktail={cocktail} />
          ))
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  userPage: {
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    height: 250,
    padding: 10,
    marginBottom: 10,
    gap: 10,
  },
  p: {
    color: "green",
  },
  listCocktails: {
    padding: 30,
    // display: "flex",
    // flexDirection: "row",
    // overflow: "scroll",
    // flexWrap: "wrap",
    // justifyContent: "center",
  },
});

export default UserComponent;
