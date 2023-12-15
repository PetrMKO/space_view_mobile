import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import React, { FC, useContext, useEffect, useRef, useState } from "react";
import {
  Animated,
  Modal,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Rating } from "react-native-elements";

import { PhotoOfDay } from "../API/nasaApi";
import { userApi } from "../API/userApi";
import { ThemeContext } from "../context/themeContext";
import { UserContext } from "../context/userContext";
import { Theme } from "../themes/types";

type Props = {
  photo: PhotoOfDay;
  visible: boolean;
  onClose: () => void;
};

const RatingModal: FC<Props> = ({ onClose, photo, visible }) => {
  const { user } = useContext(UserContext);
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);

  const downloadAndShareImage = async () => {
    try {
      const fileUri = FileSystem.cacheDirectory + photo.hdurl.split("/").pop();
      const { uri } = await FileSystem.downloadAsync(photo.hdurl, fileUri);

      if (!(await Sharing.isAvailableAsync())) {
        return;
      }
      await Sharing.shareAsync(uri);
    } catch (error) {
      // console.error("Ошибка загрузки и обмена изображением: ", error);
    }
  };

  useEffect(() => {
    userApi.getFavorites(user.login).then(({ data }) => {
      const links = data.map((item) => item.url);
      if (links.includes(photo.url)) {
        setIsFavorite(true);
      }
    });
  }, []);

  const onUndoFavorite = () => {
    console.log("undo");
  };

  const modalHeight = 450;
  const slideAnim = useRef(new Animated.Value(modalHeight)).current; // Initial value for bottom

  const slideIn = () => {
    Animated.timing(slideAnim, {
      duration: 300,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(slideAnim, {
      duration: 300,
      toValue: modalHeight,
      useNativeDriver: true,
    }).start(onClose);
  };

  const panResponder = useRef(
    PanResponder.create({
      onPanResponderMove: (event, gesture) => {
        if (gesture.dy > 0) {
          slideAnim.setValue(gesture.dy);
        }
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dy > 100) {
          slideOut();
        } else {
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
      onStartShouldSetPanResponder: () => true,
    })
  ).current;

  if (visible) slideIn();

  const styles = getStyles(theme);
  return (
    <Modal
      animationType="none"
      transparent
      visible={visible}
      onShow={slideIn}
      onRequestClose={slideOut}
    >
      <TouchableWithoutFeedback onPress={slideOut}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.modalContent,
          { transform: [{ translateY: slideAnim }] }, // Use translateY to slide the modal
        ]}
      >
        <Text style={styles.header}> Do you like the photo?</Text>
        <Text style={styles.subHeader}> Rate:</Text>
        <View style={styles.thumbContainer} {...panResponder.panHandlers}>
          <View style={styles.thumb} />
        </View>
        <Rating
          showRating={false}
          type="custom"
          startingValue={rating}
          tintColor={theme.invertBackground}
          ratingBackgroundColor={theme.mainBackground}
          onFinishRating={(value: number) => setRating(value)}
          style={styles.rating}
        />
        <TouchableOpacity style={styles.button} onPress={downloadAndShareImage}>
          <Text style={styles.buttonText}>Download</Text>
        </TouchableOpacity>
        {isFavorite ? (
          <TouchableOpacity style={styles.button} onPress={onUndoFavorite}>
            <Text style={styles.buttonText}>Undo from favorites</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={onUndoFavorite}>
            <Text style={styles.buttonText}>Add to favorite</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </Modal>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    bottomView: {
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      flex: 1,
      justifyContent: "flex-end",
    },
    button: {
      backgroundColor: theme.mainBackground,
      borderRadius: 20,
      marginVertical: 5,
      padding: 10,
      width: "70%",
    },
    buttonText: {
      color: theme.mainText,
      fontWeight: "bold",
      textAlign: "center",
    },
    header: {
      color: theme.invertText,
      fontSize: 20,
      fontWeight: "bold",
      marginVertical: 18,
    },
    modalContent: {
      alignItems: "center",
      backgroundColor: theme.invertBackground,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      bottom: 0,
      height: 300,
      justifyContent: "flex-start",
      padding: 20,
      position: "absolute",
      width: "100%",
    },
    modalOverlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      flex: 1,
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
      marginBottom: 13,
      paddingVertical: 10,
    },
    subHeader: {
      color: theme.invertText,
      fontSize: 20,
      fontWeight: "500",
    },
    thumb: {
      backgroundColor: "#ccc",
      borderRadius: 2.5,
      height: 5,
      width: 40,
    },
    thumbContainer: {
      alignItems: "center",
      padding: 10,
      position: "absolute",
      top: 0,
      width: "100%",
    },
  });

export default RatingModal;
