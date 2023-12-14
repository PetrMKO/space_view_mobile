import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { RootStackParamList, Screens } from "../../types/RootStackParamList";

export const AuthSelector = ({ navigation: { navigate } }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleSignIn = () => {
    // Обработка нажатия на кнопку Sign up
    navigation.push(Screens.Auth, {
      mode: "login",
    });
  };

  const handleLogIn = () => {
    // Обработка нажатия на кнопку Log in
    navigation.push(Screens.Auth, {
      mode: "redister",
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Image Galleries</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogIn}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#000080",
    borderRadius: 20,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 200,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  container: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    flex: 1,
    justifyContent: "center",
  },
  headerContainer: {
    alignItems: "center",
    left: 0,
    padding: 16,
    position: "absolute",
    right: 0,
    top: 0,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
