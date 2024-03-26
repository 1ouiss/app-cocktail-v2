import React, { useState } from 'react';
import { Button, Text, TextInput } from "react-native-paper";
import { NavigationProps } from '../../../types/types';
import PageLayout from '../../components/PageLayout/PageLayout';
import { StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const Login: React.FC<NavigationProps> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const auth = getAuth();

    const handleChangeEmail = (text: string) => {
        setEmail(text);
    };

    const handleChangePassword = (text: string) => {
        setPassword(text);
    };

    const handleSubmit = async () => {
        try {
            // Créer un nouvel utilisateur avec l'email et le mot de passe
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            // Extraire les données de l'utilisateur de la propriété userCredential
            const user = userCredential.user;

            console.log(user);
            
        } catch (err) {
            setErrorMessage("Une erreur inattendue s'est produite.");
        }
    };

    return (
        <PageLayout navigation={navigation}>
            <>
                <TextInput
                    style={styles.input}
                    label="Email"
                    mode='outlined'
                    value={email}
                    onChangeText={handleChangeEmail}
                />
                <TextInput
                    style={styles.input}
                    label="Password"
                    mode='outlined'
                    value={password}
                    onChangeText={handleChangePassword}
                />
                <Button mode="contained" onPress={handleSubmit}>
                    Se connecter
                </Button>
                {error && <Text>{errorMessage}</Text>}
                <Text variant="bodyMedium">Déjà un compte ? <Text onPress={() => navigation.navigate('SignIn')}>Se connecter</Text></Text>
            </>
        </PageLayout>
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

export default Login;
