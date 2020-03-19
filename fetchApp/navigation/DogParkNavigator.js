import { createStackNavigator } from "react-navigation-stack";
import { Platform } from "react-native";
import { Entypo, MaterialCommunityIcons, Feather } from "@expo/vector-icons";

import DogParksOverviewScreen from "../screens/dog_parks/DogParksOverviewScreen";
import DogParkDetailsScreen from "../screens/dog_parks/DogParkDetailsScreen";

import CheckInsScreen from "../screens/dog_parks/CheckInsScreen";

import defaultStackNavigationOptions from "./defaultStackNavOptions";

export const DogParkNavigator = createStackNavigator(
  {
    DogParkOverview: DogParksOverviewScreen,
    DogParkDetail: DogParkDetailsScreen,
    CheckIns: CheckInsScreen
  },
  { defaultStackNavigationOptions }
);
