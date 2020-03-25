import React from "react";
import { Text, View } from "react-native";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";

import { Platform, SafeAreaView, Button } from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import { DogParkNavigator } from "./DogParkNavigator";
import { UserNavigator } from "./UserNavigator";
import Auth from "../screens/user/AuthScreen";
import StartupScreen from "../screens/StartupScreen";
import UserProfileScreen from "../screens/user/UserProfileScreen";
import PastCheckInsScreen from "../screens/user/PastCheckInsScreen";
import * as authActions from "../store/actions/auth";

import Colors from "../constants/Colors";

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

const AppDrawer = createDrawerNavigator(
  {
    Dogs: UserNavigator,
    DogParks: DogParkNavigator,
    Profile: UserProfileScreen,
    PastCheckIns: PastCheckInsScreen
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    },
    contentComponent: props => {
      const dispatch = useDispatch();

      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerItems {...props} />
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(authActions.logout());
                props.navigation.navigate("Auth");
              }}
            />
          </SafeAreaView>
        </View>
      );
    }
  }
);

export default createAppContainer(
  createSwitchNavigator({
    Startup: StartupScreen,
    Auth: Auth,
    Main: AppDrawer
  })
);
