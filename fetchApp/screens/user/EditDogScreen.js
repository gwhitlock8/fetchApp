import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

import * as dogActions from "../../store/actions/dog";

const EditDogScreen = props => {
  const dogId = props.navigation.getParam("dogId");

  const editedDog = useSelector(state =>
    state.dogs.allDogs.find(dog => dog.id === dogId)
  );

  const dispatch = useDispatch();

  const [name, setName] = useState(editedDog.name);
  const [breed, setBreed] = useState(editedDog.breed);
  const [age, setAge] = useState(editedDog.age);
  const [temperment, setTemperment] = useState(editedDog.temperment);
  const [likes, setLikes] = useState(editedDog.likes);
  const [dislikes, setDislikes] = useState(editedDog.dislikes);
  const [imageUrl, setImageUrl] = useState(editedDog.imageUrl);

  const submitHandler = useCallback(() => {
    dispatch(
      dogActions.updateDog(
        dogId,
        name,
        breed,
        age,
        temperment,
        likes,
        dislikes,
        imageUrl
      )
    );
  }, [
    dispatch,
    dogId,
    name,
    breed,
    age,
    temperment,
    likes,
    dislikes,
    imageUrl
  ]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View styles={styles.formControl}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={text => setName(text)}
          />
        </View>
        <View styles={styles.formControl}>
          <Text style={styles.label}>Breed</Text>
          <TextInput
            style={styles.input}
            value={breed}
            onChangeText={text => setBreed(text)}
          />
        </View>
        <View styles={styles.formControl}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={text => setAge(text)}
          />
        </View>
        <View styles={styles.formControl}>
          <Text style={styles.label}>Temperment</Text>
          <TextInput
            style={styles.input}
            value={temperment}
            onChangeText={text => setTemperment(text)}
          />
        </View>
        <View styles={styles.formControl}>
          <Text style={styles.label}>Likes</Text>
          <TextInput
            style={styles.input}
            value={likes}
            onChangeText={text => setLikes(text)}
          />
        </View>
        <View styles={styles.formControl}>
          <Text style={styles.label}>Dislikes</Text>
          <TextInput
            style={styles.input}
            value={dislikes}
            onChangeText={text => setDislikes(text)}
          />
        </View>
        <View styles={styles.formControl}>
          <Text style={styles.label}>ImageURL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={text => setImageUrl(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditDogScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam("submit");

  return {
    headerTitle: "Edit",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Save" iconName={"check"} onPress={submitFn} />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  formControl: {
    width: "100%"
  },
  label: {
    fontFamily: "noto-sans-bold",
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  }
});

export default EditDogScreen;
