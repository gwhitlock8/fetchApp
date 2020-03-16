import React from "react";
import { FlatList, Text } from "react-native";
import { useSelector } from "react-redux";

const DogParksOverviewScreen = props => {
  const dogParks = useSelector(state => state.dogParks.allDogParks);

  return (
    <FlatList
      data={dogParks}
      renderItem={itemData => <Text>{itemData.item.name}</Text>}
    />
  );
};

DogParksOverviewScreen.navigationOptions = {
  headerTitle: "Austin Dog Parks"
};

export default DogParksOverviewScreen;
