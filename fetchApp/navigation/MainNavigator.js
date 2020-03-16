import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Platform } from "react-native";

import DogParksOverviewScreen from "../screens/dog_parks/DogParksOverviewScreen";
import Colors from "../constants/Colors";

const DogParkNavigator = createStackNavigator(
  {
    DogParkOverview: DogParksOverviewScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : ""
      },
      headerTintColor:
        Platform.OS === "android" ? Colors.secondary : Colors.primary
    }
  }
);

export default createAppContainer(DogParkNavigator);
