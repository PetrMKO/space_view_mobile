import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { AuthSelector, SignInScreen } from "./src/screens";
import { AccountScreen } from "./src/screens/AccountScreen/AccountScreen";
import { MainScreen } from "./src/screens/MainScreen/MainScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="main" component={MainScreen} />
        <Stack.Screen name="auth-selector" component={AuthSelector} />
        <Stack.Screen name="auth" component={SignInScreen} />
        <Stack.Screen name="account" component={AccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
