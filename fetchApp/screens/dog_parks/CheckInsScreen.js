import React, { useEffect } from "react";
import { FlatList, View, Text } from "react-native";
import { useSelector } from "react-redux";

import Colors from "../../constants/Colors";
import CheckInItem from "../../components/CheckInItem";

const CheckInsScreen = props => {
  const dogParkId = props.navigation.getParam("dogParkId");
  const checkIns = useSelector(state => state.checkIns.allCheckIns).filter(
    checkIn => checkIn.dog_park_id === dogParkId
  );
  const checkedInDogIds = checkIns.map(checkIn => checkIn.dog_id);
  const dogs = useSelector(state => state.dogs.allDogs);
  const userDogs = useSelector(state => state.dogs.userDogs);

  let checkedInDogs = [];
  const searchForCheckedInDogs = () => {
    dogs.forEach(dog =>
      checkedInDogIds.includes(dog.id) ? checkedInDogs.push(dog) : ""
    );
  };

  searchForCheckedInDogs();

  return (
    <View>
      <FlatList
        data={checkedInDogs}
        keyExtractor={item => item.id.toString()}
        renderItem={itemData => {
          return <Text>{itemData.item.name}</Text>;
        }}
      />
    </View>
  );
};

export default CheckInsScreen;
