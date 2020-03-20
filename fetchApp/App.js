import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import dogParksReducer from "./store/reducers/dog_park";
import checkInsReducer from "./store/reducers/check_ins";
import dogReducer from "./store/reducers/dog";

import MainNavigator from "./navigation/MainNavigator";

const rootReducer = combineReducers({
  dogParks: dogParksReducer,
  checkIns: checkInsReducer,
  dogs: dogReducer
});

const thunkAndDevTools = () => {
  composeWithDevTools();
  applyMiddleware(ReduxThunk);
};
const store = createStore(rootReducer, thunkAndDevTools());

const fetchFonts = () => {
  return Font.loadAsync({
    "noto-sans": require("./assets/fonts/NotoSansSC-Regular.otf"),
    "noto-sans-bold": require("./assets/fonts/NotoSansSC-Bold.otf")
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
