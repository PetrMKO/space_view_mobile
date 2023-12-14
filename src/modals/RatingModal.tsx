import { PhotoOfDay } from "API/nasaApi";
import { userApi } from "API/userApi";
import { UserContext } from "context/UserContext/userContext";
import React, { FC, useContext, useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Rating } from "react-native-elements";

type Props = {
  photo: PhotoOfDay;
  visible: boolean;
  onClose: () => void;
};

const RatingModal: FC<Props> = ({ onClose, photo, visible }) => {
  const { user } = useContext(UserContext);
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const onDownload = () => {
    console.log("download");
  };

  const onUndoFavorite = () => {
    userApi.getFavorites(user.id).then();
    console.log("download");
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>You liked</Text>
          <Image source={{ uri: photo.url }} style={styles.image} />
          <Text style={styles.question}>Do you like the photo?</Text>
          <Rating
            showRating
            onFinishRating={(value: number) => setRating(value)}
            style={styles.rating}
          />
          <TouchableOpacity style={styles.button} onPress={onDownload}>
            <Text style={styles.buttonText}>Download</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onUndoFavorite}>
            <Text style={styles.buttonText}>Undo from favorites</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    marginVertical: 5,
    padding: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  centeredView: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    justifyContent: "center", // Semi-transparent background
  },
  image: {
    height: 200,
    marginVertical: 10,
    resizeMode: "cover",
    width: 200,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  modalView: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 5,
    margin: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  question: {
    fontSize: 16,
    marginVertical: 10,
  },
  rating: {
    paddingVertical: 10,
  },
});

export default RatingModal;
