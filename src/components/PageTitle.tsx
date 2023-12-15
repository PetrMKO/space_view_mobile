import React, { FC, useContext } from "react";
import { StyleSheet, Text } from "react-native";

import { ThemeContext } from "../context/themeContext";
import { Theme } from "../themes/types";

type Props = {
  text: string;
};

const PageTitle: FC<Props> = ({ text }) => {
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);
  return <Text style={styles.header}>{text}</Text>;
};

export default PageTitle;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    header: {
      color: theme.invertText,
      fontSize: 48,
      fontWeight: "bold",
      marginBottom: 10,
    },
  });
