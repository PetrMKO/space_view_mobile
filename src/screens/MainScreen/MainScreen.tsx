import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { nasaApi, PhotoOfDay } from "../../API/nasaApi";
import ImageGallery from "../../components/ImageGallery/ImageGallery";
import { ThemeContext } from "../../context/themeContext";
import { Theme } from "../../themes/types";

export const MainScreen = () => {
  const [photos, setPhotos] = useState<PhotoOfDay[]>([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    nasaApi.getPhotosOfDay({ count: 6 }).then(({ data }) => {
      setPhotos(data.filter((item) => item.media_type === "image"));
    });
  }, []);

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.subHeader}>Random photos</Text>
      <ScrollView style={styles.galleryContainer}>
        <ImageGallery photos={photos} />
      </ScrollView>
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
