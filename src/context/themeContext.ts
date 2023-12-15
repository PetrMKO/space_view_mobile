import { createContext } from "react";

import { lightTheme } from "../themes/light";
import { Theme } from "../themes/types";

export type Themes = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Themes) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  setTheme: () => null,
  theme: lightTheme,
});
