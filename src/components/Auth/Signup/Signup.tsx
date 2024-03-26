import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import PageLayout from "../../PageLayout/PageLayout";
import { Button, Text, TextInput } from "react-native-paper";
import * as React from "react";
import { StyleSheet } from "react-native";
import { NavigationProps } from "../../../../types/types";
import { updateDoc } from "../../../database/set";
import { auth } from "../../../firebase";
import { useState, FC } from "react";



const Signup: FC<{ setIsSignup: React.Dispatch<React.SetStateAction<boolean>>, navigation: any }> = ({ setIsSignup, navigation }) => {

    const [user, setUser] = useState({
        id: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
    });
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    
    // const auth = getAuth();

    const handleChange = (text: string, key: string) => {
        setUser({
            ...user,
            [key]: text,
        });
    }

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
            
        } catch (err) {
            console.log(err);
            
            setErrorMessage("Une erreur inattendue s'est produite.");
        }
    };

    return ( 
        <>
            <TextInput
                style={styles.input}
                label="Email"
                mode='outlined'
                value={user.email}
                onChangeText={(e)=>handleChange(e, "email")}
            />
            <TextInput
                style={styles.input}
                label="Password"
                mode='outlined'
                value={user.password}
                onChangeText={(e)=>handleChange(e, "password")}
            />
            <TextInput
                style={styles.input}
                label="FirstName"
                mode='outlined'
                value={user.firstName}
                onChangeText={(e)=>handleChange(e, "firstName")}
            />
            <TextInput
                style={styles.input}
                label="LastName"
                mode='outlined'
                value={user.lastName}
                onChangeText={(e)=>handleChange(e, "lastName")}
            />
            <Button mode="contained" onPress={handleSubmit}>
                S'inscrire
            </Button>
            {error && <Text>{errorMessage}</Text>}
            <Text variant="bodyMedium">Déjà un compte ? <Text onPress={() => setIsSignup(true)}>Se connecter</Text></Text>
        </>
     );
    }
    const styles = StyleSheet.create({
       input: {
           width: 300,
           height: 44,
           padding: 10,
           marginBottom: 10,
       },
   });
export default Signup
