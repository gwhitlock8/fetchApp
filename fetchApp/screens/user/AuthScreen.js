import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Button,
  ActivityIndicator,
  Alert,
  Image
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import * as authActions from "../../store/actions/auth";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const AuthScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignUp, setIsSignUp] = useState(false);

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: ""
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "OK" }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if (isSignUp) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password,
        formState.inputValues.first_name,
        formState.inputValues.last_name,
        formState.inputValues.address,
        formState.inputValues.city,
        formState.inputValues.state,
        formState.inputValues.zip
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate("Main");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  const signupFormHandler = () => {
    if (isSignUp) {
      return (
        <ScrollView>
          <Input
            id="email"
            label="E-Mail"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            errorText="Please enter valid email."
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <Input
            id="password"
            label="Password"
            keyboardType="default"
            secureTextEntry
            required
            minLength={8}
            autoCapitalize="none"
            errorText="Please enter a valid password."
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <Input
            id="first_name"
            label="First Name"
            keyboardType="default"
            required
            errorText="Please enter valid first name."
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <Input
            id="last_name"
            label="Last Name"
            keyboardType="default"
            required
            errorText="Please enter valid last name."
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <Input
            id="address"
            label="Address"
            keyboardType="default"
            required
            errorText="Please enter valid address."
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <Input
            id="city"
            label="City"
            keyboardType="default"
            required
            errorText="Please enter valid city."
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <Input
            id="state"
            label="State"
            keyboardType="default"
            required
            errorText="Please enter valid state."
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <Input
            id="zip"
            label="Zip"
            keyboardType="default"
            required
            errorText="Please enter valid zip code."
            onInputChange={inputChangeHandler}
            initialValue=""
          />
        </ScrollView>
      );
    } else {
      return (
        <ScrollView>
          <Input
            id="email"
            label="E-Mail"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            errorText="Please enter valid email."
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <Input
            id="password"
            label="Password"
            keyboardType="default"
            secureTextEntry
            required
            minLength={8}
            autoCapitalize="none"
            errorText="Please enter valid password."
            onInputChange={inputChangeHandler}
            initialValue=""
          />
        </ScrollView>
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        style={styles.gradient}
      >
        <Image source={require("../../assets/images/fetchLogoName.png")} />
        <Card style={styles.authContainer}>
          {signupFormHandler()}
          <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
              <Button
                title={isSignUp ? "Sign Up" : "Login"}
                color={Colors.primary}
                onPress={authHandler}
              />
            )}
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title={`Switch to  ${isSignUp ? "Login" : "Sign Up"}`}
              color={Colors.tertiary}
              onPress={() => {
                setIsSignUp(prevState => !prevState);
              }}
            />
          </View>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Fetch"
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 500,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10,
    backgroundColor: "white",
    borderColor: Colors.textColor,
    borderWidth: 2,
    fontWeight: "bold",
    borderRadius: 10
  }
});

export default AuthScreen;
