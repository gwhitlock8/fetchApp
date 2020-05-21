import React, { useCallback, useEffect, useReducer } from "react";
import {
  View,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";

import * as userActions from "../../store/actions/user";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const UserProfileScreen = (props) => {
  const loggedInUser = useSelector((state) => {
    console.log("USER", state.auth);
    return state.auth.user;
  });

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      first_name: loggedInUser.first_name,
      last_name: loggedInUser.last_name,
      email: loggedInUser.email,
      address: loggedInUser.address,
      city: loggedInUser.city,
      state: loggedInUser.state,
      zip: loggedInUser.zip,
    },
    inputValidities: {
      first_name: true,
      last_name: true,
      email: true,
      address: true,
      city: true,
      state: true,
      zip: true,
    },
    formIsValid: true,
  });

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert(
        "Invalid Input",
        "Please check to ensure you have completed all fields.",
        [{ text: "OK" }]
      );
      return;
    }
    dispatch(
      userActions.updateUser(
        formState.inputValues.first_name,
        formState.inputValues.last_name,
        formState.inputValues.email,
        formState.inputValues.address,
        formState.inputValues.city,
        formState.inputValues.state,
        formState.inputValues.zip
      )
    );
    props.navigation.navigate("UserDogs");
  }, [dispatch, loggedInUser, formState]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Card style={styles.profileContainer}>
          <Input
            id="first_name"
            label="First Name"
            errorText="Please enter a valid first name"
            autoCapitalize="words"
            keyboardType="default"
            initialValue={loggedInUser.first_name}
            initiallyValid={true}
            onInputChange={inputChangeHandler}
            required
          />
          <Input
            id="last_name"
            label="Last Name"
            errorText="Please enter a valid last name"
            autoCapitalize="words"
            keyboardType="default"
            initialValue={loggedInUser.last_name}
            initiallyValid={true}
            onInputChange={inputChangeHandler}
            required
          />
          <Input
            id="email"
            label="E-Mail"
            keyboardType="email-address"
            email
            autoCapitalize="none"
            initialValue={loggedInUser.email}
            onInputChange={inputChangeHandler}
          />
          <Input
            id="address"
            label="Address"
            keyboardType="default"
            initialValue={loggedInUser.address}
            onInputChange={inputChangeHandler}
          />
          <Input
            id="city"
            label="City"
            keyboardType="default"
            initialValue={loggedInUser.city}
            onInputChange={inputChangeHandler}
          />
          <Input
            id="state"
            label="State"
            keyboardType="default"
            initialValue={loggedInUser.state}
            onInputChange={inputChangeHandler}
          />
          <Input
            id="zip"
            label="Zip"
            keyboardType="default"
            initialValue={loggedInUser.zip}
            onInputChange={inputChangeHandler}
          />
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
};

UserProfileScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Profile",
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === "android"
              ? "md-checkmark-circle-outline"
              : "ios-checkmark-circle-outline"
          }
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  profileContainer: {
    marginTop: -75,
    width: "80%",
    padding: 10,
  },
});

export default UserProfileScreen;
