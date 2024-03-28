import React, { useState } from "react";
import { Button, Text, TextInput } from "react-native-paper";
import { NavigationProps } from "../../../types/types";
import PageLayout from "../../components/PageLayout/PageLayout";
import { StyleSheet, View } from "react-native";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import Signup from "../../components/Auth/Signup";
import Signin from "../../components/Auth/Signin";

const Login: React.FC<NavigationProps> = ({ navigation }) => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <PageLayout navigation={navigation}>
      <View style={styles.page}>
        {isSignup && (
          <Signup navigation={navigation} setIsSignup={setIsSignup} />
        )}
        {!isSignup && (
          <Signin navigation={navigation} setIsSignup={setIsSignup} />
        )}
      </View>
    </PageLayout>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
export default Login;
