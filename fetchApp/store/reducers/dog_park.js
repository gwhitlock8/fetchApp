import { SET_DOG_PARKS } from "../actions/dog_park";

const initialState = {
  allDogParks: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DOG_PARKS:
      return {
        allDogParks: action.parks
      };
    default:
      return state;
  }
};
