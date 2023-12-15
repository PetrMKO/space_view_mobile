import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useMemo, useState } from "react";

import { User } from "./src/API/userApi";
import { AccountButton } from "./src/components/AccountButton";
import { ThemeContext, Themes } from "./src/context/themeContext";
import { UserContext } from "./src/context/userContext";
import { AuthSelector, SignInScreen } from "./src/screens";
import { AccountScreen } from "./src/screens/AccountScreen/AccountScreen";
import { MainScreen } from "./src/screens/MainScreen/MainScreen";
import { themeConfig } from "./src/themes/theme";
import { RootStackParamList, Screens } from "./src/types/RootStackParamList";

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [user, setUser] = useState<User>();
  const [themeName, setTheme] = useState<Themes>("light");

  const userContextValue = useMemo(
    () => ({
      setUser,
      user,
    }),
    [user]
  );

  const theme = themeConfig[themeName];

  const themeContextValue = useMemo(
    () => ({
      setTheme,
      theme,
    }),
    [themeName]
  );

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 9 && currentHour > 21 && themeName === "light") {
      setTheme("dark");
    } else if (themeName === "dark") {
      setTheme("light");
    }
  }, [themeName, setTheme]);

  return (
    <UserContext.Provider value={userContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.headerBackground,
              },
              headerTintColor: theme.headerText,
              headerTitleStyle: {
                color: theme.headerText,
              },
            }}
          >
            <Stack.Screen
              name={Screens.AuthSelector}
              component={AuthSelector}
              options={{
                title: "Space View",
              }}
            />
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
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
