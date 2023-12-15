import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { PhotoOfDay } from "../../API/nasaApi";
import { userApi } from "../../API/userApi";
import ImageGallery from "../../components/ImageGallery/ImageGallery";
import PageTitle from "../../components/PageTitle";
import { ThemeContext } from "../../context/themeContext";
import { Theme } from "../../themes/types";

export const AccountScreen = () => {
  const [photos, setPhotos] = useState<PhotoOfDay[]>([]);
  const { setTheme, theme } = useContext(ThemeContext);

  useEffect(() => {
    userApi.getFavorites("user01").then(({ data }) => {
      setPhotos(data);
    });
  }, []);

  const onChangeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <PageTitle text="You likes" />
      <ScrollView style={styles.galleryContainer}>
        <ImageGallery photos={photos} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onChangeTheme}>
            <Text style={styles.buttonText}>Change theme</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      alignItems: "center",
      backgroundColor: theme.mainBackground,
      borderRadius: 20,
      marginVertical: 10,
      paddingHorizontal: 20,
      paddingVertical: 10,
      width: 200,
    },
    buttonContainer: {
      flexDirection: "row",
      gap: 5,
      paddingBottom: 10,
      paddingHorizontal: 20,
      paddingTop: 5,
    },
    buttonText: {
      color: theme.mainText,
      fontSize: 18,
    },
    container: {
      alignItems: "center",
      backgroundColor: theme.invertBackground,
      flex: 1,
      justifyContent: "center",
      paddingTop: 10,
    },
    galleryContainer: {
      flex: 1,
      width: "100%",
    },
    header: {
      color: theme.invertText,
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
    },
  });
