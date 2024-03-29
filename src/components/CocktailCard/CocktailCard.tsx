import { useEffect, useContext, useState } from "react";
import { Icon, IconButton, Text } from "react-native-paper";
import { CocktailType } from "../../../types/types";
import { ImageBackground, Pressable, View } from "react-native";
import { DatabaseContext } from "../../context/DatabaseContext";
import { IconHeart, IconTrash } from "@tabler/icons-react-native";
import { VariantProp } from "react-native-paper/lib/typescript/components/Typography/types";
import { deleteDbDoc } from "../../database/delete";

const CocktailCard = ({
  cocktail,
  showDescription = true,
  variantTitle = "headlineSmall",
  height = 200,
  isDeleted,
}: {
  cocktail: CocktailType;
  showDescription?: boolean;
  variantTitle?: VariantProp<any>;
  height?: number;
  isDeleted?: boolean;
}) => {
  const { user, setUser } = useContext(DatabaseContext);
  const [likedByCreator, setLikedByCreator] = useState(false);

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
  const handleDelete = async () => {
    try {
      if (cocktail.id) {
        await deleteDbDoc({
          collection: "cocktails",
          docId: cocktail.id,
        });
      } else {
        console.log("ID de cocktail non défini.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const formatDescription = (description: string): string => {
    const maxLength = 80;
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + "...";
    }
    return description;
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
        zIndex: 1,
      }}
    >
      <View
        style={{
          width: "100%",
          height,
          borderRadius: 16,
          backgroundColor: "#E4D4F4",
        }}
      >
        <ImageBackground
          source={{
            uri:
              cocktail.image ||
              "https://firebasestorage.googleapis.com/v0/b/app-cocktails.appspot.com/o/cocktails%2Fnot_found.jpeg?alt=media&token=b3be89b1-3c70-4aed-bd3a-6bebd36a7c2c",
          }}
          imageStyle={{ borderRadius: 16 }}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 16,
          }}
          resizeMode="cover"
        />
        {isDeleted ? (
          <Pressable
            onPress={handleDelete}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              padding: 10,
              backgroundColor: "#00000080",
              width: 30,
              height: 30,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 16,
            }}
          >
            <IconTrash size={20} color="white" />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              handleSaveInFavorites();
            }}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              padding: 10,
              backgroundColor: "#00000080",
              borderRadius: 16,
            }}
          >
            {user?.favorites.includes(cocktail.id as string) ? (
              <Icon source="heart" size={20} color="#F31260" />
            ) : (
              <IconHeart size={20} color="white" />
            )}
          </Pressable>
        )}
      </View>
      <View style={{ flex: 1, paddingVertical: 5 }}>
        <Text variant={variantTitle} numberOfLines={1}>
          {cocktail.name}
        </Text>
        {showDescription && (
          <Text variant="bodyMedium" numberOfLines={3}>
            {formatDescription(cocktail.description)}
          </Text>
        )}
      </View>
    </View>
  );
};

export default CocktailCard;
