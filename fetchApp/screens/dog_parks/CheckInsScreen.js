import React, { useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";
import CheckInItem from "../../components/CheckInItem";
import * as checkInActions from "../../store/actions/check_ins";

const CheckInsScreen = props => {
  const dispatch = useDispatch();

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

  const checkoutIcon = dog => {
    if (!userDogs.includes(dog)) {
      return;
    }
    return <Ionicons name="ios-exit" size={23} color={Colors.secondary} />;
  };

  const checkoutUserDog = (checkInId, dog) => {
    if (!userDogs.includes(dog)) {
      return;
    }
    dispatch(checkInActions.checkout(checkInId));
  };

  return (
    <View>
      <FlatList
        data={checkedInDogs}
        keyExtractor={item => item.id.toString()}
        renderItem={itemData => {
          const selectedCheckIn = checkIns.filter(
            checkIn => checkIn.dog_id === itemData.item.id
          );
          return (
            <CheckInItem
              id={itemData.item.id}
              name={itemData.item.name}
              imageUrl={{ source: { uri: itemData.item.imageUrl } }}
              subtitle={`${itemData.item.age} year old ${itemData.item.breed}`}
              checkoutIcon={checkoutIcon(itemData.item)}
              onCheckout={() =>
                checkoutUserDog(selectedCheckIn[0].id, itemData.item)
              }
            />
          );
        }}
      />
    </View>
  );
};

export default CheckInsScreen;
