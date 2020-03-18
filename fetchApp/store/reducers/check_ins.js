import { CHECK_IN, CHECKOUT } from "../actions/check_ins";
import CheckIn from "../../models/check_in";

const initialState = {
  allCheckIns: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHECK_IN:
      const dogPark = action.dogPark;
      const dogParkName = dogPark.name;
      const newCheckIn = new CheckIn(
        Math.round(Math.random() * 1000 + 1),
        dogParkName
      );
      return {
        ...state,
        allCheckIns: { ...state.allCheckIns, [dogPark.id]: newCheckIn }
      };
    case CHECKOUT:
      delete state.allCheckIns[action.dogPark.id];
      return {
        ...state,
        allCheckIns: { ...state.allCheckIns }
      };

    default:
      return state;
  }
};
