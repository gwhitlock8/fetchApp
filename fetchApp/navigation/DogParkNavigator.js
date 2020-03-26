import React from "react";

import { createStackNavigator } from "react-navigation-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import DogParksOverviewScreen from "../screens/dog_parks/DogParksOverviewScreen";
import DogParkDetailsScreen from "../screens/dog_parks/DogParkDetailsScreen";

import CheckInsScreen from "../screens/dog_parks/CheckInsScreen";
import Colors from "../constants/Colors";

import { defaultNavOptions } from "./defaultNavOptions";

export const DogParkNavigator = createStackNavigator(
  {
    DogParkOverview: DogParksOverviewScreen,
    DogParkDetail: DogParkDetailsScreen,
    CheckIns: CheckInsScreen
  },
  {
    navigationOptions: {
      drawerLabel: "Parks",
      drawerIcon: drawerConfig => (
        <MaterialCommunityIcons name="tree" color={Colors.primary} size={23} />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);
