import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    backgroundColor: theme.colors.secondary40,
    borderRadius: 8,
    fontFamily: theme.fonts.text400,
    fontSize: 13,
    marginLeft: 4,
    textAlign: "center",
    color: theme.colors.highlight,
  },
});
