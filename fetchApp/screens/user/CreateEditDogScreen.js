import React, { useCallback, useEffect, useReducer, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Input from "../../components/UI/Input";

import * as dogActions from "../../store/actions/dog";
import Colors from "../../constants/Colors";

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

const CreateEditDogScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dogId = props.navigation.getParam("dogId");

  const editedDog = useSelector((state) =>
    state.dogs.allDogs.find((dog) => dog.id === dogId)
  );

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: editedDog ? editedDog.name : "",
      breed: editedDog ? editedDog.breed : "",
      age: editedDog ? editedDog.age : "",
      weight: editedDog ? editedDog.weight : "",
      temperment: editedDog ? editedDog.temperment : "",
      likes: editedDog ? editedDog.likes : "",
      dislikes: editedDog ? editedDog.dislikes : "",
      imageUrl: editedDog ? editedDog.imageUrl : "",
    },
    inputValidities: {
      name: editedDog ? true : false,
      breed: editedDog ? true : false,
      age: editedDog ? true : false,
      weight: editedDog ? true : false,
      temperment: editedDog ? true : false,
      likes: editedDog ? true : false,
      dislikes: editedDog ? true : false,
      imageUrl: editedDog ? true : false,
    },
    formIsValid: editedDog ? true : false,
  });

  useEffect(() => {}, [error]);
  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert(
        "Invalid Input",
        "Please check to ensure you completed all fields.",
        [{ text: "OK" }]
      );
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      if (editedDog) {
        await dispatch(
          dogActions.updateDog(
            dogId,
            formState.inputValues.name,
            formState.inputValues.breed,
            formState.inputValues.age,
            formState.inputValues.weight,
            formState.inputValues.temperment,
            formState.inputValues.likes,
            formState.inputValues.dislikes,
            formState.inputValues.imageUrl
          )
        );
      } else {
        await dispatch(
          dogActions.createDog(
            formState.inputValues.name,
            formState.inputValues.breed,
            formState.inputValues.age,
            formState.inputValues.weight,
            formState.inputValues.temperment,
            formState.inputValues.likes,
            formState.inputValues.dislikes,
            formState.inputValues.imageUrl
          )
        );
      }
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
    props.navigation.navigate("UserDogs");
  }, [dispatch, dogId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

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

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator
          style={styles.centered}
          size="large"
          color={Colors.primary}
        />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={200}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="name"
            label="Name"
            errorText="Please enter a valid name"
            autoCapitalize="words"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedDog ? editedDog.name : ""}
            initiallyValid={!!editedDog}
            required
          />
          <Input
            id="breed"
            label="Breed"
            errorText="Please enter a valid breed"
            autoCapitalize="words"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedDog ? editedDog.breed : ""}
            initiallyValid={!!editedDog}
            required
          />
          <Input
            id="age"
            label="Age"
            errorText="Please enter a valid age"
            keyboardType="number-pad"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedDog ? editedDog.age : ""}
            initiallyValid={!!editedDog}
            required
          />
          <Input
            id="weight"
            label="Approximate Weight"
            errorText="Please enter a valid weight"
            autoCapitalize="words"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedDog ? editedDog.weight : ""}
            initiallyValid={!!editedDog}
            required
          />
          <Input
            id="temperment"
            label="Temperment"
            errorText="Please enter a valid temperment"
            autoCapitalize="sentences"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedDog ? editedDog.temperment : ""}
            initiallyValid={!!editedDog}
            required
          />
          <Input
            id="likes"
            label="Likes"
            errorText="Please enter valid likes"
            autoCapitalize="sentences"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedDog ? editedDog.likes : ""}
            initiallyValid={!!editedDog}
            required
          />
          <Input
            id="dislikes"
            label="Dislikes"
            errorText="Please enter valid dislikes"
            autoCapitalize="sentences"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedDog ? editedDog.dislikes : ""}
            initiallyValid={!!editedDog}
            required
          />
          <Input
            id="imageUrl"
            label="ImageURL"
            errorText="Please enter a valid imageURL"
            returnKeyType="done"
            onInputChange={inputChangeHandler}
            initialValue={editedDog ? editedDog.imageUrl : ""}
            initiallyValid={!!editedDog}
            required
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

CreateEditDogScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam("submit");

  return {
    headerTitle: navData.navigation.getParam("dogId")
      ? "Edit Dog"
      : "Add Dog Profile",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === "android"
              ? "md-checkmark-circle-outline"
              : "ios-checkmark-circle-outline"
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreateEditDogScreen;
