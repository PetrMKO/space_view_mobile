import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import { nasaApi, PhotoOfDay } from "../../API/api";

export const MainScreen = () => {
  const [photos, setPhotos] = useState<PhotoOfDay[]>([]);

  useEffect(() => {
    nasaApi.getPhotosOfDay({ count: 6 }).then(({ data }) => {
      setPhotos(data.filter((item) => item.media_type === "image"));
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Image Galleries</Text>
      <Text style={styles.subHeader}>The best photos according to users</Text>
      <ScrollView style={styles.galleryContainer}>
        {photos.map((photo) => (
          <Image
            key={photo.url}
            source={{ uri: photo.url }}
            style={styles.image}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    paddingTop: 40,
  },
  galleryContainer: {
    flex: 1,
    width: "100%",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  image: {
    height: 200,
    marginBottom: 10,
    width: "100%",
  },
  subHeader: {
    color: "grey",
    fontSize: 18,
    marginBottom: 20,
  },
});
