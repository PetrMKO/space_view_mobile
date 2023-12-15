import { createContext, Dispatch, SetStateAction } from "react";

import { lightTheme } from "../themes/light";
import { Theme } from "../themes/types";

export type Themes = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Themes>>;
};

export const ThemeContext = createContext<ThemeContextType>({
  setTheme: () => null,
  theme: lightTheme,
});
