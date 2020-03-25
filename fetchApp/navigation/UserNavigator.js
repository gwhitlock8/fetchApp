import React from "react";
import { TouchableHighlight, Image } from "react-native";

import { createStackNavigator } from "react-navigation-stack";

import { defaultNavOptions } from "./defaultNavOptions";

import UserDogScreen from "../screens/user/UserDogsScreen";
import CreateEditDogScreen from "../screens/user/CreateEditDogScreen";
import DogDetailScreen from "../screens/user/DogDetailScreen";
import Colors from "../constants/Colors";

export const UserNavigator = createStackNavigator(
  {
    UserDogs: {
      screen: UserDogScreen,
      navigationOptions: { ...defaultStackNavigationOptions }
    },
    CreateEditDog: CreateEditDogScreen,
    DogDetails: DogDetailScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);
