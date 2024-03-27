import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import PageLayout from "../../PageLayout/PageLayout";
import { Button, Text, TextInput } from "react-native-paper";
import * as React from "react";
import { StyleSheet } from "react-native";
import { updateDoc } from "../../../database/set";
import { auth } from "../../../firebase";
import { useState, FC } from "react";
import { NavigationProp } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from "react";
import { DatabaseContext } from "../../../context/DatabaseContext";


const Signup: FC<{
  setIsSignup: React.Dispatch<React.SetStateAction<boolean>>;
  navigation: NavigationProp<any>;
}> = ({ setIsSignup, navigation }) => {
    console.log(AsyncStorage);
    
  const [user, setUser] = useState({
    id: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const {setIsSigned} = useContext(DatabaseContext);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (text: string, key: string) => {
    setUser({
      ...user,
      [key]: text,
    });
  };

  const storeData = async (value:string) => {
    try {
        await AsyncStorage.setItem('user', value);
        console.log(value);
    } catch (e) {
        console.log(e);
    }
  };
  const handleSubmit = async () => {
    try {
      // Créer un nouvel utilisateur avec l'email et le mot de passe
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      console.log(userCredential);
      const newUser = userCredential.user;

      await storeData(newUser.uid);

      await updateDoc({
        newDatas: {
          id: newUser.uid,
          email: newUser.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        collectionId: "users",
        docId: newUser.uid,
      });
      setIsSigned(true);
    } catch (err : any) {
        switch (err.code) {
            case "auth/email-already-in-use":
                setErrorMessage("Cet email est déjà utilisé.");
                setError(true);
                break;
            case "auth/weak-password":
                setErrorMessage("Le mot de passe doit contenir au moins 6 caractères.");
                setError(true);
                break;
            default:
            }
        console.log(err);      
    }
  };

  return (
    <>
      <TextInput
        style={styles.input}
        label="Email"
        mode="outlined"
        value={user.email}
        onChangeText={(e) => handleChange(e, "email")}
      />
        {error && errorMessage.includes("email") && (<Text>Erreur: {errorMessage}</Text>)}
      <TextInput
        style={styles.input}
        label="FirstName"
        mode="outlined"
        value={user.firstName}
        onChangeText={(e) => handleChange(e, "firstName")}
      />
      <TextInput
        style={styles.input}
        label="LastName"
        mode="outlined"
        value={user.lastName}
        onChangeText={(e) => handleChange(e, "lastName")}
      />
      <TextInput
        style={styles.input}
        label="Password"
        mode="outlined"
        value={user.password}
        onChangeText={(e) => handleChange(e, "password")}
        secureTextEntry
      />
        {error && errorMessage.includes("mot de passe") && (<Text>Erreur: {errorMessage}</Text>)}      
      <Button mode="contained" onPress={handleSubmit}>
        S'inscrire
      </Button>
      <Text variant="bodyMedium">
        Déjà un compte ?{" "}
        <Text onPress={() => setIsSignup(true)}>Se connecter</Text>
      </Text>
    </>
  );
};
const styles = StyleSheet.create({
  input: {
    width: 300,
    height: 44,
    padding: 10,
    marginBottom: 10,
  },
});
export default Signup;
