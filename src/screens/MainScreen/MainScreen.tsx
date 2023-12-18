import React, { useContext, useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import { nasaApi, Photo, PhotoOfDay } from "../../API/nasaApi";
import { userApi } from "../../API/userApi";
import ImageGallery from "../../components/ImageGallery/ImageGallery";
import { ThemeContext } from "../../context/themeContext";
import { UserContext } from "../../context/userContext";
import { Theme } from "../../themes/types";

export const MainScreen = () => {
  const [photos, setPhotos] = useState<PhotoOfDay[]>([]);
  const [blocked, setBlocked] = useState<string[]>([]);
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    userApi
      .getBlocked(user.id)
      .then(({ data }) => {
        console.log(data);
        setBlocked(data.photos.map((item) => item.url));
      })
      .then(() => nasaApi.getPhotosOfDay({ count: 6 }))
      .then(({ data }) => {
        setPhotos(
          data.filter(
            (item) => item.media_type === "image" && !blocked.includes(item.url)
          )
        );
      });
  }, []);

  const styles = getStyles(theme);

  const onBlock = (photo: Photo) => {
    setPhotos((prev) => prev.filter((item) => item.url !== photo.url));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subHeader}>Random photos</Text>
      <ImageGallery photos={photos} onBlock={onBlock} />
    </View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      backgroundColor: theme.invertBackground,
      flex: 1,
      justifyContent: "center",
      paddingTop: 20,
    },
    galleryContainer: {
      flex: 1,
      width: "100%",
    },
    image: {
      height: 200,
      marginBottom: 10,
      width: "100%",
    },
    subHeader: {
      color: theme.invertText,
      fontSize: 20,
      marginBottom: 20,
    },
  });
