import { useContext } from "react";
import { Avatar, Button, Text } from "react-native-paper";
import { DatabaseContext } from "../../context/DatabaseContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CocktailCard from "../CocktailCard/CocktailCard";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
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
      </View>
      <Pressable style={styles.logout} onPress={handleDisconnect}>
        <Text>Logout</Text>
      </Pressable>
      <View style={styles.listCocktails}>
        <Text style={{ fontSize: 20 }}>Les Cocktails que vous avez créé :</Text>
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
    // backgroundColor: "grey",
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
    backgroundColor: "white",
  },
  logout: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "grey",
    backgroundColor: "white",
    padding: 10,
    width: "100%",
    textAlign: "center",
  },
});

export default UserComponent;
