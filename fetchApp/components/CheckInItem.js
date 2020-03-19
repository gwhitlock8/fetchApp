import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const CheckInItem = props => {
  return (
    <View>
      <Text>
        <Text>Dog Image </Text> <Text>Dog Name</Text>
      </Text>
      <Button title="View Details" />
    </View>
  );
};

export default CheckInItem;
