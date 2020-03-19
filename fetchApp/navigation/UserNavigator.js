import { createStackNavigator } from "react-navigation-stack";

import defaultStackNavigationOptions from "./defaultStackNavOptions";

import UserDogScreen from "../screens/user/UserDogsScreen";
import CreateDogScreen from "../screens/user/CreateDogScreen";
import DogDetailScreen from "../screens/user/DogDetailScreen";
import EditDogScreen from "../screens/user/EditDogScreen";

export const UserNavigator = createStackNavigator(
  {
    UserDogs: UserDogScreen,
    CreateDog: CreateDogScreen,
    DogDetails: DogDetailScreen,
    EditDog: EditDogScreen
  },
  { defaultStackNavigationOptions }
);
