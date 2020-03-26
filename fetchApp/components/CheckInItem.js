import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { ListItem } from "react-native-elements";

const CheckInItem = props => {
  return (
    <ListItem
      key={props.id}
      title={props.name}
      leftAvatar={props.imageUrl}
      subtitle={props.subtitle}
      bottomDivider
      rightIcon={props.checkoutIcon}
      onPress={props.onCheckout}
    />
  );
};

export default CheckInItem;
