import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useMemo, useState } from "react";

import { User } from "./src/API/userApi";
import { UserContext } from "./src/context/UserContext/userContext";
import { AuthSelector, SignInScreen } from "./src/screens";
import { AccountScreen } from "./src/screens/AccountScreen/AccountScreen";
import { MainScreen } from "./src/screens/MainScreen/MainScreen";
import { RootStackParamList, Screens } from "./src/types/RootStackParamList";

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [user, setUser] = useState<User>();

  const userContextValue = useMemo(
    () => ({
      setUser,
      user,
    }),
    [user]
  );

  return (
    <UserContext.Provider value={userContextValue}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={Screens.Main} component={MainScreen} />
          <Stack.Screen name={Screens.AuthSelector} component={AuthSelector} />
          <Stack.Screen
            name={Screens.Auth}
            component={SignInScreen}
            initialParams={{
              mode: "login",
            }}
          />
          <Stack.Screen name={Screens.Account} component={AccountScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
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
