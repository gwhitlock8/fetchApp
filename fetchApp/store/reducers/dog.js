import { CREATE_DOG, UPDATE_DOG, DELETE_DOG, SET_DOGS } from "../actions/dog";

import Dog from "../../models/dog";

const initialState = {
  allDogs: [],
  userDogs: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DOGS:
      return {
        allDogs: action.dogs,
        userDogs: action.dogs.filter((prod) => prod.user_id === action.userId),
      };
    case CREATE_DOG:
      const enteredDog = action.dog;
      const newDog = new Dog(
        enteredDog.id,
        enteredDog.userId,
        enteredDog.name,
        enteredDog.breed,
        enteredDog.age,
        enteredDog.weight,
        enteredDog.temperment,
        enteredDog.likes,
        enteredDog.dislikes,
        enteredDog.imageUrl
      );

      return {
        ...state,
        allDogs: state.allDogs.concat(newDog),
        userDogs: state.userDogs.concat(newDog),
      };
    case UPDATE_DOG:
      const newInfoDog = action.dog;
      const updatedDog = new Dog(
        newInfoDog.dogId,
        newInfoDog.userId,
        newInfoDog.name,
        newInfoDog.breed,
        newInfoDog.age,
        newInfoDog.weight,
        newInfoDog.temperment,
        newInfoDog.likes,
        newInfoDog.dislikes,
        newInfoDog.imageUrl
      );

      const userDogIndex = state.userDogs.findIndex(
        (dog) => dog.id === newInfoDog.dogId
      );
      const updatedUserDogs = [...state.userDogs];
      updatedUserDogs[userDogIndex] = updatedDog;

      const allDogIndex = state.allDogs.findIndex(
        (dog) => dog.id === newInfoDog.dogId
      );
      const updatedAllDogs = [...state.allDogs];
      updatedAllDogs[allDogIndex] = updatedDog;
      console.log("updatedDogs", updatedUserDogs, "dogIndex", userDogIndex);

      return {
        ...state,
        allDogs: updatedAllDogs,
        userDogs: updatedUserDogs,
      };
    case DELETE_DOG:
      return {
        ...state,
        allDogs: state.allDogs.filter((dog) => dog.id !== action.id),
        userDogs: state.userDogs.filter((dog) => dog.id !== action.id),
      };
  }
  return state;
};
