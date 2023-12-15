import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useMemo, useState } from "react";

import { User } from "./src/API/userApi";
import { AccountButton } from "./src/components/AccountButton";
import { ThemeContextType, Themes } from "./src/context/themeContext";
import { UserContext } from "./src/context/userContext";
import { AuthSelector, SignInScreen } from "./src/screens";
import { AccountScreen } from "./src/screens/AccountScreen/AccountScreen";
import { MainScreen } from "./src/screens/MainScreen/MainScreen";
import { themeConfig } from "./src/themes/theme";
import { RootStackParamList, Screens } from "./src/types/RootStackParamList";

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [user, setUser] = useState<User>();
  const [theme, setTheme] = useState<Themes>("light");

  const userContextValue = useMemo(
    () => ({
      setUser,
      user,
    }),
    [user]
  );

  const themeContextValue = useMemo(
    () => ({
      setTheme,
      theme: themeConfig[theme],
    }),
    [theme]
  );

  return (
    <UserContext.Provider value={userContextValue}>
      <ThemeContextType.Provider value={themeContextValue}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name={Screens.Auth}
              component={SignInScreen}
              initialParams={{
                mode: "login",
              }}
              options={{
                title: "Space View",
              }}
            />
            <Stack.Screen
              name={Screens.AuthSelector}
              component={AuthSelector}
              options={{
                title: "Space View",
              }}
            />
            <Stack.Screen
              name={Screens.Main}
              component={MainScreen}
              options={{
                headerRight: () => <AccountButton />,
                title: "Gallery",
              }}
            />
            <Stack.Screen
              name={Screens.Account}
              component={AccountScreen}
              options={{
                title: "Account",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeContextType.Provider>
    </UserContext.Provider>
  );
};

export default App;
