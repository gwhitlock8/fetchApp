import React from "react";
import { TouchableHighlight, Image } from "react-native";

import { createStackNavigator } from "react-navigation-stack";

import defaultStackNavigationOptions from "./defaultStackNavOptions";

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
