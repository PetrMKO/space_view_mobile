type AuthMode = "login" | "signin";

export enum Screens {
  Main = "Main",
  AuthSelector = "AuthSelector",
  Auth = "Auth",
  Account = "Account",
}

export type RootStackParamList = {
  [Screens.Main]: undefined;
  [Screens.Account]: undefined;
  [Screens.AuthSelector]: undefined;
  [Screens.Auth]: {
    mode: AuthMode;
  };
  [Screens.Main]: undefined;
};
