import React, { useState, useEffect } from "react";
import { FlatList, View, ActivityIndicator, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import DogPark from "../../components/DogPark";
import * as dogParkActions from "../../store/actions/dog_park";
import * as checkInActions from "../../store/actions/check_ins";
import Colors from "../../constants/Colors";

const DogParksOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const dogParks = useSelector((state) => state.dogParks.allDogParks);

  const dispatch = useDispatch();

  useEffect(() => {
    const loadParksAndCheckIns = async () => {
      setIsLoading(true);
      await dispatch(dogParkActions.fetchDogParks());
      await dispatch(checkInActions.fetchCheckIns());
      setIsLoading(false);
    };
    loadParksAndCheckIns();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      data={dogParks}
      keyExtractor={(item, index) => index.toString()}
      renderItem={(itemData) => {
        return (
          <DogPark
            image={itemData.item.imageUrl}
            name={itemData.item.name}
            location={itemData.item.location}
            onViewDetail={() => {
              props.navigation.navigate("DogParkDetail", {
                dogParkId: itemData.item.id,
                dogParkName: itemData.item.name,
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

DogParksOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Austin Dog Parks",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DogParksOverviewScreen;
