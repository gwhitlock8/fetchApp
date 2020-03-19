import { DOGS } from "../../data/dummy-data";
import { CREATE_DOG, UPDATE_DOG } from "../actions/dog";

import Dog from "../../models/dog";

const initialState = {
  allDogs: DOGS
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_DOG:
      const enteredDog = action.dog;
      const newDog = new Dog(
        Math.floor(Math.random(1, 1000) * 1),
        enteredDog.name,
        enteredDog.breed,
        enteredDog.age,
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
  }
  return state;
};
