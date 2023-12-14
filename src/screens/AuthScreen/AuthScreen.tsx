import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { userApi } from "../../API/userApi";
import { UserContext } from "../../context/UserContext/userContext";
import { RootStackParamList, Screens } from "../../types/RootStackParamList";

export const SignInScreen: FC = () => {
  const { setUser } = useContext(UserContext);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState<boolean>();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleSubmit = () => {
    userApi.login(login, password).then(({ data }) => {
      if (data.length) {
        setUser(data[0]);
        navigation.reset(Screens.Main);
        console.log(data[0]);
        console.log("asdfadf");
      } else {
        setIsError(true);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Image Galleries</Text>
      </View>
      <Text style={styles.title}>Sign in</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
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
    color: "#FFF",
    fontSize: 18,
  },
  container: {
    alignItems: "center",
    backgroundColor: "#FFF",
    flex: 1,
    justifyContent: "center",
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
    backgroundColor: "#FFF",
    borderColor: "#000080",
    borderRadius: 5,
    borderWidth: 1,
    marginVertical: 10,
    padding: 15,
    width: "80%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
});
