import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import dogParksReducer from "./store/reducers/dog_park";
import MainNavigator from "./navigation/MainNavigator";

const rootReducer = combineReducers({
  dogParks: dogParksReducer
});

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
