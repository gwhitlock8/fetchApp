import React from "react";
import { FlatList, Alert, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

import Dog from "../../components/Dog";
import * as dogActions from "../../store/actions/dog";

const UserDogsScreen = props => {
  const dogs = useSelector(state => state.dogs.allDogs);

  const deleteHandler = id => {
    Alert.alert("Are you sure?", "Do you really want to delete this pup?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(dogActions.deleteDog(id));
        }
      }
    ]);
  };

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
            onDelete={deleteHandler.bind(this, itemData.item.id)}
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
          title="Create"
          iconName={
            Platform.OS === "android"
              ? "md-add-circle-outline"
              : "ios-add-circle-outline"
          }
          onPress={() => {
            navData.navigation.navigate("CreateEditDog");
          }}
        />
      </HeaderButtons>
    )
  };
};

export default UserDogsScreen;
