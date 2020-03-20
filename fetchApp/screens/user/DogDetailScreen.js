import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SectionList,
  Platform
} from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";

import Colors from "../../constants/Colors";

const DogDetailScreen = props => {
  const dogId = props.navigation.getParam("dogId");

  const selectedDog = useSelector(state =>
    state.dogs.allDogs.find(dog => dog.id === dogId)
  );

  return (
    <View>
      <View>
        <Image style={styles.image} source={{ uri: selectedDog.imageUrl }} />
      </View>
      <View>
        <SectionList
          sections={[
            { title: "Breed", data: [selectedDog.breed] },
            { title: "Age", data: [selectedDog.age + " years"] },
            { title: "Approx. Weight", data: [selectedDog.weight + " lbs."] },
            { title: "Temperment", data: [selectedDog.temperment] },
            { title: "Likes", data: [selectedDog.likes] },
            { title: "Dislikes", data: [selectedDog.dislikes] }
          ]}
          renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

DogDetailScreen.navigationOptions = navData => {
  const dogId = navData.navigation.getParam("dogId");

  return {
    headerTitle: navData.navigation.getParam("dogName"),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Edit"
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          onPress={() => {
            navData.navigation.navigate("CreateEditDog", {
              dogId: dogId
            });
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 20,
    backgroundColor: Colors.secondary,
    textAlign: "center",
    fontFamily: "noto-sans-bold"
  },
  item: {
    fontFamily: "noto-sans",
    fontSize: 14,
    margin: 20,
    textAlign: "center"
  }
});
export default DogDetailScreen;
