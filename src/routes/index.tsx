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
import GetStarted from "../pages/GetStarted";
import IngredientCocktailPage from "../pages/IngredientCocktailPage";

const Stack = createNativeStackNavigator();

const Routes = () => {
  const { user } = useContext(DatabaseContext);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="getstarted"
        screenOptions={{
          headerShown: false,
          animation: "none",
        }}
      >
        {user ? (
          <>
            <Stack.Screen
              name="home"
              component={Home}
              options={{ title: "Accueil" }}
            />
            <Stack.Screen
              name="stock"
              component={Stock}
              options={{ title: "Mon stock" }}
            />
            <Stack.Screen
              name="new"
              component={New}
              options={{ title: "Nouveau cocktail" }}
            />
            <Stack.Screen
              name="favorites"
              component={Favorites}
              options={{ title: "Favoris" }}
            />
            <Stack.Screen name="user" component={User} />
            <Stack.Screen name="cocktail" component={Cocktail} />
            <Stack.Screen
              name="ingredientwithcocktail"
              component={IngredientCocktailPage}
              options={{ title: "Cocktails avec cet ingrédient" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="getstarted" component={GetStarted} />
            <Stack.Screen name="login" component={Login} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
