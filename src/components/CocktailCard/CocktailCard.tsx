import { Text } from "react-native-paper";
import { CocktailType } from "../../../types/types";
import { ImageBackground, Pressable, View } from "react-native";
import { useContext } from "react";
import { DatabaseContext } from "../../context/DatabaseContext";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react-native";

const CocktailCard = ({
  cocktail,
  showDescription = true,
}: {
  cocktail: CocktailType;
  showDescription?: boolean;
}) => {
  const { user, setUser } = useContext(DatabaseContext);

  const handleSaveInFavorites = () => {
    if (user) {
      if (user.favorites.includes(cocktail.id as string)) {
        setUser({
          ...user,
          favorites: user.favorites.filter(
            (favorite) => favorite !== cocktail.id
          ),
        });
      } else {
        setUser({
          ...user,
          favorites: [...user.favorites, cocktail.id as string],
        });
      }
    }
  };

  return (
    <View
      style={{
        padding: 10,
        margin: 10,
        backgroundColor: "#fff",
        borderRadius: 24,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <View
        style={{
          width: "100%",
          height: 200,
          borderRadius: 16,
          backgroundColor: "red",
        }}
      >
        <ImageBackground
          src={cocktail.image}
          imageStyle={{ borderRadius: 16 }}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 16,
          }}
          resizeMode="cover"
        />
        <Pressable
          onPress={() => {
            handleSaveInFavorites();
          }}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            padding: 10,
            backgroundColor: "#00000080", // 80% opacity
            borderRadius: 16,
          }}
        >
          {user?.favorites.includes(cocktail.id as string) ? (
            <IconHeartFilled size={20} color="white" />
          ) : (
            <IconHeart size={20} color="white" />
          )}
        </Pressable>
      </View>
      <View style={{ flex: 1 }}>
        <Text variant="headlineSmall">{cocktail.name}</Text>
        {showDescription && (
          <Text variant="bodyMedium">{cocktail.description}</Text>
        )}
      </View>
    </View>
  );
};

export default CocktailCard;
