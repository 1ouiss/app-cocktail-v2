import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../pages/Home";
import Favorites from "../pages/Favorites";
import New from "../pages/New";
import Stock from "../pages/Stock";
import User from "../pages/User";
import Login from "../pages/Login";
import { useContext } from "react";
import { DatabaseContext } from "../context/DatabaseContext";

const Stack = createNativeStackNavigator();

const Routes = () => {
  const {user}= useContext(DatabaseContext);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          animation: "none",
        }}
      >
        {
          user  ? <>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Stock" component={Stock} />
        <Stack.Screen name="New" component={New} />
        <Stack.Screen name="Favorites" component={Favorites} />
        <Stack.Screen name="User" component={User} />
          </> : 
        <Stack.Screen name="Login" component={Login} />
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
