import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
  container: {
    width: 104,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginRight: 8,
  },
  content: {
    width: 100,
    height: 116,
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 7,
  },
  title: {
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
    fontSize: 15,
  },
  check: {
    position: "absolute",
    right: 8,
    top: 8,
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: theme.colors.secondary100,
    // alignSelf: "flex-end",
    // marginRight: 5,
  },
  checked: {
    position: "absolute",
    right: 8,
    top: 8,
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: theme.colors.primary,
    // alignSelf: "flex-end",
    // marginRight: 5,
  },
});
