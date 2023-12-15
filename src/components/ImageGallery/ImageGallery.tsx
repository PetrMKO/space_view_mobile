import React, { FC, useState } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

import { PhotoOfDay } from "../../API/nasaApi";
import RatingModal from "../../modals/RatingModal";

type Props = {
  photos: PhotoOfDay[];
};

const ImageGallery: FC<Props> = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoOfDay | null>(null);

  return (
    <>
      <ScrollView style={styles.galleryContainer}>
        {photos.map((photo) => (
          <TouchableOpacity
            key={photo.url}
            onPress={() => setSelectedPhoto(photo)}
          >
            <Image
              source={{ uri: photo.url }}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      {selectedPhoto && (
        <RatingModal
          photo={selectedPhoto}
          visible={!!selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </>
  );
};

export default ImageGallery;

const styles = StyleSheet.create({
  galleryContainer: {
    flex: 1,
    width: "100%",
  },
  image: {
    height: 200,
    marginBottom: 10,
    width: "100%",
  },
});
