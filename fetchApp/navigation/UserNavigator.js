import { createStackNavigator } from "react-navigation-stack";

import defaultStackNavigationOptions from "./defaultStackNavOptions";

import UserDogScreen from "../screens/user/UserDogsScreen";
import CreateEditDogScreen from "../screens/user/CreateEditDogScreen";
import DogDetailScreen from "../screens/user/DogDetailScreen";

export const UserNavigator = createStackNavigator(
  {
    UserDogs: UserDogScreen,
    CreateEditDog: CreateEditDogScreen,
    DogDetails: DogDetailScreen
  },
  { defaultStackNavigationOptions }
);
