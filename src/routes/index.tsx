import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../pages/Home";
import Favorites from "../pages/Favorites";
import New from "../pages/New";
import Stock from "../pages/Stock";
import User from "../pages/User";

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animation: "none",
        }}
      >
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="stock" component={Stock} />
        <Stack.Screen name="new" component={New} />
        <Stack.Screen name="favorites" component={Favorites} />
        <Stack.Screen name="user" component={User} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
