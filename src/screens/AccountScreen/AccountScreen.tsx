import React, { useContext, useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import { PhotoOfDay } from "../../API/nasaApi";
import { userApi } from "../../API/userApi";
import ImageGallery from "../../components/ImageGallery/ImageGallery";
import { ThemeContext } from "../../context/themeContext";
import { Theme } from "../../themes/types";

export const AccountScreen = () => {
  const [photos, setPhotos] = useState<PhotoOfDay[]>([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    userApi.getFavorites("user01").then(({ data }) => {
      setPhotos(data);
    });
  }, []);

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>You likes</Text>
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
      backgroundColor: theme.mainBackground,
      flex: 1,
      justifyContent: "center",
      paddingTop: 30,
    },
    galleryContainer: {
      flex: 1,
      width: "100%",
    },
    header: {
      fontSize: 24,
      fontWeight: "bold",
    },
  });
