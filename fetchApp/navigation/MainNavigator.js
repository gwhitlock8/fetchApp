import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Platform } from "react-native";

import DogParksOverviewScreen from "../screens/dog_parks/DogParksOverviewScreen";
import DogParkDetailsScreen from "../screens/dog_parks/DogParkDetailsScreen";
import EditDogScreen from "../screens/user/EditDogScreen";

import Colors from "../constants/Colors";

const DogParkNavigator = createStackNavigator(
  {
    DogParkOverview: DogParksOverviewScreen,
    DogParkDetail: DogParkDetailsScreen
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
      headerTintColor:
        Platform.OS === "android" ? Colors.secondary : Colors.primary
    }
  }
);

export default createAppContainer(DogParkNavigator);
