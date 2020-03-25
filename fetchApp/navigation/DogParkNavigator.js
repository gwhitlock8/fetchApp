import React from "react";
import { TouchableHighlight, Image } from "react-native";

import { createStackNavigator } from "react-navigation-stack";
import { Platform } from "react-native";
import { Entypo, MaterialCommunityIcons, Feather } from "@expo/vector-icons";

import DogParksOverviewScreen from "../screens/dog_parks/DogParksOverviewScreen";
import DogParkDetailsScreen from "../screens/dog_parks/DogParkDetailsScreen";

import CheckInsScreen from "../screens/dog_parks/CheckInsScreen";
import Colors from "../constants/Colors";

import defaultStackNavigationOptions from "./defaultStackNavOptions";

export const DogParkNavigator = createStackNavigator(
  {
    DogParkOverview: DogParksOverviewScreen,
    DogParkDetail: DogParkDetailsScreen,
    CheckIns: CheckInsScreen
  },
  {
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
  }
);
