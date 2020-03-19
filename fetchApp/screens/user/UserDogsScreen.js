import React from "react";
import { FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

import Dog from "../../components/Dog";
import * as dogActions from "../../store/actions/dog";

const UserDogsScreen = props => {
  const dogs = useSelector(state => state.dogs.allDogs);

  const dispatch = useDispatch();

  return (
    <FlatList
      data={dogs}
      keyExtractor={(item, index) => index.toString()}
      renderItem={itemData => {
        return (
          <Dog
            image={itemData.item.imageUrl}
            name={itemData.item.name}
            breed={itemData.item.breed}
            onViewDetail={() => {
              props.navigation.navigate("DogDetails", {
                dogId: itemData.item.id,
                dogName: itemData.item.name
              });
            }}
          />
        );
      }}
    />
  );
};

UserDogsScreen.navigationOptions = navData => {
  return {
    headerTitle: "User Dogs",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Create New Dog Profile"
          iconName="circle-with-plus"
          onPress={() => {
            navData.navigation.navigate("CreateDog");
          }}
        />
      </HeaderButtons>
    )
  };
};

export default UserDogsScreen;
