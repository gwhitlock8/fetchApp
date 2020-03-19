import React from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView,
  Platform
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import * as checkInActions from "../../store/actions/check_ins";

import HeaderButton from "../../components/UI/HeaderButton";

import Colors from "../../constants/Colors";

const DogParkDetailsScreen = props => {
  const dogParkId = props.navigation.getParam("dogParkId");

  const selectedDogPark = useSelector(state =>
    state.dogParks.allDogParks.find(park => park.id === dogParkId)
  );

  const checkIns = useSelector(state => state.checkIns.allCheckIns);
  const isCheckedIn = Object.keys(checkIns).find(id => id === dogParkId);

  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedDogPark.imageUrl }} />
      <View style={styles.actions}>
        {isCheckedIn ? (
          <Button
            color={Colors.primarySecond}
            title="Checkout"
            onPress={() => {
              dispatch(checkInActions.checkout(selectedDogPark));
            }}
          />
        ) : (
          <Button
            color={Colors.primarySecond}
            title="Check In"
            onPress={() => {
              dispatch(checkInActions.checkIn(selectedDogPark));
            }}
          />
        )}
      </View>
      <Text style={styles.location}>{selectedDogPark.location}</Text>
      <Text style={styles.description}>{selectedDogPark.description}</Text>
      <View style={styles.icons}>
        {selectedDogPark.isOffLeash ? (
          <View>
            <MaterialCommunityIcons
              name="dog-side"
              size={32}
              style={styles.leashIcon}
            />
            <Text>Off-Leash</Text>
          </View>
        ) : (
          <View>
            <MaterialCommunityIcons
              name="dog-service"
              size={32}
              style={styles.leashIcon}
            />
            <Text>Leash Required</Text>
          </View>
        )}
        {selectedDogPark.isFenced ? (
          <View>
            <Image
              source={require("../../assets/images/fenceIcon.png")}
              fadeDuration={0}
              style={styles.fenceIcon}
            />
            <Text>Fenced Area</Text>
          </View>
        ) : (
          <View>
            <Image
              source={require("../../assets/images/noFenceIcon.png")}
              fadeDuration={0}
              style={styles.fenceIcon}
            />
            <Text style={{ textAlign: "center" }}>No Fenced Area</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

DogParkDetailsScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam("dogParkName"),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Check-Ins"
          iconName={"location"}
          onPress={() => {
            navData.navigation.navigate("CheckIns");
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300
  },
  actions: {
    marginVertical: 10,
    alignItems: "center"
  },
  location: {
    fontSize: 20,
    marginVertical: 20,
    color: Colors.tertiary,
    textAlign: "center",
    fontFamily: "noto-sans"
  },
  description: {
    color: Colors.textColor,
    marginHorizontal: 20,
    alignItems: "center",
    fontFamily: "noto-sans"
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 20
  },
  leashIcon: {
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center"
  },
  fenceIcon: {
    justifyContent: "center",
    alignSelf: "center",
    width: 35,
    height: 35
  }
});

export default DogParkDetailsScreen;
