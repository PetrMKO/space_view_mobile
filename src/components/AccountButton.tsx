import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

import Icon from "../../assets/userIcon.png";
import { Screens } from "../types/AuthMode";
import { RootStackParamList } from "../types/RootStackParamList";

export const AccountButton = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.navigate(Screens.Account);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.button}>
      <Image source={Icon} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  image: {
    height: 30,
    width: 30,
  },
});
