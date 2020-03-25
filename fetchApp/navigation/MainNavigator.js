import React from "react";
import { Text } from "react-native";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import { Platform } from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

import { DogParkNavigator } from "./DogParkNavigator";
import { UserNavigator } from "./UserNavigator";
import Auth from "../screens/user/AuthScreen";
import StartupScreen from "../screens/StartupScreen";

import Colors from "../constants/Colors";
import { defaultStackNavigationOptions } from "./defaultStackNavOptions";

const userParkTabScreenConfig = {
  UserDogs: {
    screen: UserNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Feather name="user" size={25} color={Colors.secondary} />;
      },
      tabColor: Colors.primary,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text styles={{ fontFamily: "noto-sans-bold" }}>User Info</Text>
        ) : (
          "User Info"
        )
    }
  },
  DogParks: {
    screen: DogParkNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <MaterialCommunityIcons
            name="bone"
            size={25}
            color={Colors.secondary}
          />
        );
      },
      tabColor: Colors.primary,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text styles={{ fontFamily: "noto-sans-bold" }}>Dog Parks</Text>
        ) : (
          "Dog Parks"
        )
    }
  }
};

const UserParkTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(userParkTabScreenConfig, {
        activeColor: "white",
        shifting: true
      })
    : createBottomTabNavigator(userParkTabScreenConfig, {
        tabBarOptions: {
          labelStyle: {
            fontFamily: "noto-sans-bold"
          },
          activeTintColor: Colors.primarySecond
        }
      });

const MainNavigator = createStackNavigator({
  UserParks: {
    screen: UserParkTabNavigator,
    navigationOptions: {
      headerShown: false
    }
  }
});

export default createAppContainer(
  createSwitchNavigator({
    Startup: StartupScreen,
    Auth: Auth,
    Main: MainNavigator
  })
);
