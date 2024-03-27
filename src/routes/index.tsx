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
import Cocktail from "../pages/Cocktail/Cocktail";

const Stack = createNativeStackNavigator();

const Routes = () => {
  const { user } = useContext(DatabaseContext);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          animation: "none",
        }}
      >
        {user ? (
          <>
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="stock" component={Stock} />
            <Stack.Screen name="new" component={New} />
            <Stack.Screen name="favorites" component={Favorites} />
            <Stack.Screen name="user" component={User} />
            <Stack.Screen name="cocktail" component={Cocktail} />
          </>
        ) : (
          <Stack.Screen name="login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
