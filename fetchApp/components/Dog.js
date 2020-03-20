import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from "react-native";

import Colors from "../constants/Colors";
import Card from "./UI/Card";

const Dog = props => {
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.dog}>
      <View style={styles.touchable}>
        <TouchableComponent onPress={props.onViewDetail} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: props.image }} />
            </View>
            <View style={styles.text}>
              <Text style={styles.name}>{props.name}</Text>
              <Text style={styles.breed}>{props.breed}</Text>
            </View>
            <View style={styles.actions}>
              <Button
                color={Colors.primary}
                title="View Details"
                onPress={props.onViewDetail}
              />
              <Button title="Delete" color="red" onPress={props.onDelete} />
            </View>
          </View>
        </TouchableComponent>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  dog: {
    height: 300,
    margin: 20
  },
  touchable: {
    overflow: "hidden",
    borderRadius: 10
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  name: {
    fontSize: 18,
    marginVertical: 4,
    fontFamily: "noto-sans-bold"
  },
  breed: {
    fontSize: 12,
    color: "#888",
    fontFamily: "noto-sans"
  },
  actions: {
    justifyContent: "space-between",
    alignItems: "center",
    height: "20%",
    paddingHorizontal: 20
  },
  text: {
    padding: 10,
    height: "20%"
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: "20%",
    paddingVertical: 10,
    paddingHorizontal: 20
  }
});

export default Dog;
