import { Platform } from "react-native";

import Colors from "../constants/Colors";

export const defaultStackNavigationOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.primary : ""
    },
    headerTitleStyle: {
      fontFamily: "noto-sans-bold"
    },
    headerBackTitleStyle: {
      fontFamily: "noto-sans"
    },
    headerBackTitleTintColor: Colors.primary,
    headerTintColor:
      Platform.OS === "android" ? Colors.secondary : Colors.primary
  }
};
