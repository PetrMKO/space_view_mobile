type RootStackParamList = "login" | "signin";

export enum Screens {
  Main = "Main",
  AuthSelector = "AuthSelector",
  Auth = "Auth",
  Account = "Account",
}

export type RootStackParamList = {
  [Screens.Main]: undefined;
  [Screens.Account]: undefined;
  [Screens.Auth]: {
    mode: RootStackParamList;
  };
  [Screens.Main]: undefined;
};
