import { CREATE_DOG, UPDATE_DOG, DELETE_DOG, SET_DOGS } from "../actions/dog";

import Dog from "../../models/dog";

const initialState = {
  allDogs: [],
  userDogs: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DOGS:
      return {
        allDogs: action.dogs,
        userDogs: action.dogs.filter(prod => prod.user_id === action.userId)
      };
    case CREATE_DOG:
      const enteredDog = action.dog;
      const newDog = new Dog(
        enteredDog.id,
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
        allDogs: state.allDogs.concat(newDog)
      };
    case UPDATE_DOG:
      const dogIndex = state.allDogs.findIndex(dog => dog.id === action.id);
      const newInfoDog = action.dog;
      const updatedDog = new Dog(
        action.id,
        newInfoDog.name,
        newInfoDog.breed,
        newInfoDog.age,
        newInfoDog.weight,
        newInfoDog.temperment,
        newInfoDog.likes,
        newInfoDog.dislikes,
        newInfoDog.imageUrl
      );

      const updatedDogs = [...state.allDogs];
      updatedDogs[dogIndex] = updatedDog;

      return {
        ...state,
        allDogs: updatedDogs
      };
    case DELETE_DOG:
      return {
        ...state,
        allDogs: state.allDogs.filter(dog => dog.id !== action.dogId)
      };
  }
  return state;
};
