import { Inter_200ExtraLight } from "@expo-google-fonts/inter";
import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    backgroundColor: theme.colors.secondary40,
    borderRadius: 8,
    fontFamily: theme.fonts.text400,
    fontSize: 13,
    marginLeft: 4,
    paddingVertical: 20,
    paddingHorizontal: 20,
    color: theme.colors.highlight,
    textAlignVertical: "top",
  },
});
