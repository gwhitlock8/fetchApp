import React from "react";
import { FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import DogPark from "../../components/DogPark";
import * as checkInActions from "../../store/actions/check_ins";

const DogParksOverviewScreen = props => {
  const dogParks = useSelector(state => state.dogParks.allDogParks);

  const dispatch = useDispatch();

  return (
    <FlatList
      data={dogParks}
      renderItem={itemData => {
        return (
          <DogPark
            image={itemData.item.imageUrl}
            name={itemData.item.name}
            location={itemData.item.location}
            onViewDetail={() => {
              props.navigation.navigate("DogParkDetail", {
                dogParkId: itemData.item.id,
                dogParkName: itemData.item.name
              });
            }}
            onCheckIn={() => {
              dispatch(checkInActions.checkIn(itemData.item));
            }}
          />
        );
      }}
    />
  );
};

DogParksOverviewScreen.navigationOptions = {
  headerTitle: "Austin Dog Parks"
};

export default DogParksOverviewScreen;
