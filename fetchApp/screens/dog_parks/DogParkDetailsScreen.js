import React from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView
} from "react-native";
import { useSelector } from "react-redux";

const DogParkDetailsScreen = props => {
  const dogParkId = props.navigation.getParam("dogParkId");

  const selectedDogPark = useSelector(state =>
    state.dogParks.allDogParks.find(park => park.id === dogParkId)
  );

  return (
    <View>
      <Text>{selectedDogPark.name}</Text>
    </View>
  );
};

DogParkDetailsScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam("dogParkTitle")
  };
};

const styles = StyleSheet.create({});

export default DogParkDetailsScreen;
