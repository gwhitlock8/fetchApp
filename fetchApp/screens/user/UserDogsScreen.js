import React, { useState, useEffect } from "react";
import {
  FlatList,
  Alert,
  Platform,
  ActivityIndicator,
  View,
  StyleSheet,
  Text
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

import Dog from "../../components/Dog";
import * as dogActions from "../../store/actions/dog";
import Colors from "../../constants/Colors";

const UserDogsScreen = props => {
  const [isLoading, setIsLoading] = useState(false);

  const dogs = useSelector(state => state.dogs.userDogs);

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

  useEffect(() => {
    const loadDogs = async () => {
      setIsLoading(true);
      await dispatch(dogActions.fetchDogs());
      setIsLoading(false);
    };
    loadDogs();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && dogs.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>
          No dogs found. Go ahead and create your first dog profile by clicking
          the button in the top right of the screen.
        </Text>
      </View>
    );
  }

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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default UserDogsScreen;
