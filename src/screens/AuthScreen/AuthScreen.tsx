import AsyncStorage from "@react-native-async-storage/async-storage";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { userApi } from "../../API/userApi";
import { ThemeContext } from "../../context/themeContext";
import { UserContext } from "../../context/userContext";
import { Theme } from "../../themes/types";
import {
  AuthMode,
  RootStackParamList,
  Screens,
} from "../../types/RootStackParamList";

type Props = {
  route: RouteProp<RootStackParamList, Screens.Auth>;
};

export const SignInScreen: FC<Props> = ({ route }) => {
  const { setUser } = useContext(UserContext);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);
  const mode: AuthMode = route.params.mode ?? "login";

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleSubmit = () => {
    const { login: logIn, register } = userApi;
    const request =
      mode === "login" ? logIn(login, password) : register(login, password);
    request
      .then(({ data }) => {
        setUser(data);
        AsyncStorage.setItem("user", JSON.stringify(data));
        navigation.reset({
          index: 0,
          routes: [{ name: Screens.Main }],
        });
      })
      .catch(() => {
        setIsError(true);
      });
  };

  useEffect(() => {
    setIsError(false);
  }, [login, password]);

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {mode === "signin" ? "Sign up" : "Log in"}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Login"
        value={login}
        onChangeText={setLogin}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {isError && (
        <Text style={styles.errorText}>
          {mode === "signin"
            ? "User with this login already exist"
            : "Wrong login or password"}
        </Text>
      )}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
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
    errorText: {
      color: "indianred",
      fontSize: 18,
    },
    headerContainer: {
      alignItems: "center",
      padding: 16,
      position: "absolute",
      top: 0,
      width: "100%",
    },
    headerText: {
      color: "#FFF",
      fontSize: 20,
      fontWeight: "bold",
    },
    input: {
      backgroundColor: theme.invertBackground,
      borderRadius: 5,
      borderWidth: 1,
      color: theme.invertText,
      marginVertical: 10,
      padding: 15,
      width: "80%",
    },
    title: {
      color: theme.invertText,
      fontSize: 24,
      fontWeight: "bold",
      marginVertical: 20,
    },
  });
