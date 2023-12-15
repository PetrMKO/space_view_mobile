import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { ThemeContext } from "../../context/themeContext";
import { Theme } from "../../themes/types";
import { RootStackParamList, Screens } from "../../types/RootStackParamList";

export const AuthSelector = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { theme } = useContext(ThemeContext);

  const handleSignIn = () => {
    // Обработка нажатия на кнопку Sign up
    navigation.push(Screens.Auth, {
      mode: "login",
    });
  };

  const handleLogIn = () => {
    // Обработка нажатия на кнопку Log in
    navigation.push(Screens.Auth, {
      mode: "signin",
    });
  };

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogIn}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
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
    buttonText: {
      color: theme.mainText,
      fontSize: 18,
    },
    container: {
      alignItems: "center",
      backgroundColor: theme.invertBackground,
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
