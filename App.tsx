import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const [user, setUser] = useState<User | null>(null);
  const [themeName, setTheme] = useState<Themes>("light");

  useEffect(() => {
    const currentHour = new Date().getHours();
    if ((currentHour < 9 || currentHour > 21) && themeName === "light") {
      setTheme("dark");
    }
    if (currentHour > 9 && currentHour < 21 && themeName === "dark") {
      setTheme("light");
    }
  }, [themeName, setTheme]);

  useEffect(() => {
    if (user) return;

    AsyncStorage.getItem("user").then((data: string) => {
      setUser(JSON.parse(data));
    });
  });

  const userContextValue = useMemo(
    () => ({
      setUser,
      user,
    }),
    [user?.login]
  );

  const theme = themeConfig[themeName];

  const themeContextValue = useMemo(
    () => ({
      setTheme,
      theme,
    }),
    [themeName]
  );
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
            {user ? (
              <>
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
              </>
            ) : (
              <>
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
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
