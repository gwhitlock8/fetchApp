import React from "react";

import { createStackNavigator } from "react-navigation-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { defaultNavOptions } from "./defaultNavOptions";

import UserDogScreen from "../screens/user/UserDogsScreen";
import CreateEditDogScreen from "../screens/user/CreateEditDogScreen";
import DogDetailScreen from "../screens/user/DogDetailScreen";
import Colors from "../constants/Colors";

export const DogNavigator = createStackNavigator(
  {
    UserDogs: UserDogScreen,
    CreateEditDog: CreateEditDogScreen,
    DogDetails: DogDetailScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <MaterialCommunityIcons name="dog" color={Colors.primary} size={23} />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);
