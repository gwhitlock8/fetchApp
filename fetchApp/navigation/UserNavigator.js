import React from "react";

import { createStackNavigator } from "react-navigation-stack";
import { MaterialIcons } from "@expo/vector-icons";

import { defaultNavOptions } from "./defaultNavOptions";

import UserProfileScreen from "../screens/user/UserProfileScreen";
import PastCheckInsScreen from "../screens/user/PastCheckInsScreen";
import Colors from "../constants/Colors";

export const UserNavigator = createStackNavigator(
  {
    Profile: UserProfileScreen,
    PastCheckIns: PastCheckInsScreen
  },
  {
    navigationOptions: {
      drawerLabel: "User Profile",
      drawerIcon: drawerConfig => (
        <MaterialIcons name="person" color={Colors.primary} size={23} />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);
