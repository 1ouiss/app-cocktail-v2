import {
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import PageLayout from "../../PageLayout/PageLayout";
import { Button, Text, TextInput } from "react-native-paper";
import * as React from "react";
import { StyleSheet } from "react-native";
import { NavigationProps } from "../../../../types/types";
import { useState, FC } from "react";
import { auth } from "../../../firebase";
import { NavigationProp } from "@react-navigation/native";

const Signin: FC<{
  setIsSignup: React.Dispatch<React.SetStateAction<boolean>>;
  navigation: NavigationProp<any>;
}> = ({ setIsSignup, navigation }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (text: string, key: string) => {
    setUser({
      ...user,
      [key]: text,
    });
  };

  const handleSubmit = async () => {
    let response = {};
    let userConected = null;
    try {
      await signInWithEmailAndPassword(auth, user.email, user.password).then(
        async (userCredential: UserCredential) => {
          userConected = userCredential.user;
          console.log(userConected.uid);
        }
      );
    } catch (err) {
      setErrorMessage("Une erreur inattendue s'est produite.");
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
      <TextInput
        style={styles.input}
        label="Password"
        mode="outlined"
        value={user.password}
        onChangeText={(e) => handleChange(e, "password")}
        secureTextEntry
      />
      <Button mode="contained" onPress={handleSubmit}>
        Se connecter
      </Button>
      {error && <Text>{errorMessage}</Text>}
      <Text variant="bodyMedium">
        Vous n'avez pas de compte ?
        <Text onPress={() => setIsSignup(false)}>Inscrivez-vous</Text>
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
export default Signin;
