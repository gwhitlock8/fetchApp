import { Platform } from "react-native";

import Colors from "../constants/Colors";

export const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : ""
  },
  headerTitleStyle: {
    fontFamily: "noto-sans-bold"
  },
  headerBackTitleStyle: {
    fontFamily: "noto-sans"
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary
};
