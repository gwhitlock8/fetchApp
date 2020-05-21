import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView,
  Platform,
  Modal,
  Alert,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import * as checkInActions from "../../store/actions/check_ins";

import HeaderButton from "../../components/UI/HeaderButton";

import Colors from "../../constants/Colors";

const DogParkDetailsScreen = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const dogParkId = props.navigation.getParam("dogParkId");

  const selectedDogPark = useSelector((state) =>
    state.dogParks.allDogParks.find((park) => park.id === dogParkId)
  );

  const allDogs = useSelector((state) => state.dogs.allDogs);
  const userDogs = useSelector((state) => state.dogs.userDogs);
  const checkIns = useSelector((state) => state.checkIns.allCheckIns);
  const availableDogs = [];
  const checkedInDogs = [];
  const checkInDogsIds = checkIns.map((checkin) => checkin.dog_id);

  const dogsAvailbleForCheckin = () => {
    userDogs.forEach((dog) =>
      checkInDogsIds.includes(dog.id) ? "" : availableDogs.push(dog)
    );
  };

  dogsAvailbleForCheckin();

  console.log(
    "AVAILABLE DOGS >>>>> ",
    availableDogs,
    "CHECKED IN DOGS >>>>>>>> ",
    checkedInDogs
  );

  const dispatch = useDispatch();

  return (
    <View>
      <ScrollView>
        <Image
          style={styles.image}
          source={{ uri: selectedDogPark.imageUrl }}
        />
        <View style={styles.actions}>
          <Button
            color={Colors.primarySecond}
            title="Check In"
            onPress={() => {
              availableDogs.length
                ? setModalVisible(!modalVisible)
                : Alert.alert(
                    "All your dogs are already checked in!",
                    "Please checkout of one of the other parks before checking into a new park",
                    [{ text: "OK" }]
                  );
            }}
          />
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
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert(`You have checked in to ${selectedDogPark.name}`);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <FlatList
                data={availableDogs}
                keyExtractor={(item) => item.id.toString()}
                renderItem={(itemData) => {
                  return (
                    <BouncyCheckbox
                      isChecked={false}
                      fillColor={Colors.tertiary}
                      fontFamily="noto-sans-bold"
                      text={itemData.item.name}
                      onPress={(checked) => {
                        checked
                          ? checkedInDogs.push(itemData.item)
                          : checkedInDogs.filter(
                              (dog) => dog !== itemData.item
                            );
                      }}
                    />
                  );
                }}
              />
              <TouchableHighlight
                style={{
                  ...styles.openButton,
                  backgroundColor: Colors.primary,
                  width: 130,
                }}
                onPress={() => {
                  checkedInDogs.forEach((dog) => {
                    dispatch(checkInActions.checkIn(dogParkId, dog.id));
                  });
                  setModalVisible(!modalVisible);
                }}
              >
                <Text
                  style={{
                    fontFamily: "noto-sans-bold",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Check In Dogs
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{
                  ...styles.openButton,
                  backgroundColor: Colors.secondary,
                  marginTop: 10,
                  width: 130,
                }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text
                  style={{
                    fontFamily: "noto-sans-bold",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Close
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

DogParkDetailsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("dogParkName"),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Check-Ins"
          iconName={Platform.OS === "android" ? "md-pin" : "ios-pin"}
          onPress={() => {
            navData.navigation.navigate("CheckIns", {
              dogParkId: navData.navigation.getParam("dogParkId"),
            });
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 175,
    maxHeight: 285,
  },
  openButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
  location: {
    fontSize: 20,
    marginVertical: 20,
    color: Colors.tertiary,
    textAlign: "center",
    fontFamily: "noto-sans",
  },
  description: {
    color: Colors.textColor,
    marginHorizontal: 20,
    alignItems: "center",
    fontFamily: "noto-sans",
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 20,
  },
  leashIcon: {
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
  },
  fenceIcon: {
    justifyContent: "center",
    alignSelf: "center",
    width: 35,
    height: 35,
  },
});

export default DogParkDetailsScreen;
