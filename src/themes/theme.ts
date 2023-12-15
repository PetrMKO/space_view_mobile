import { Themes } from "../context/themeContext";
import { darkTheme } from "./dark";
import { lightTheme } from "./light";
import { Theme } from "./types";

export const themeConfig: Record<Themes, Theme> = {
  dark: darkTheme,
  light: lightTheme,
};
