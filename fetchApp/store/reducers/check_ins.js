import { CHECKOUT, SET_CHECK_INS, CREATE_CHECK_IN } from "../actions/check_ins";
import CheckIn from "../../models/check_in";

const initialState = {
  allCheckIns: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CHECK_INS:
      return {
        allCheckIns: action.checkins
      };
    case CREATE_CHECK_IN:
      const check_in = action.check_in;
      const newCheckIn = new CheckIn(
        check_in.id,
        check_in.dogParkId,
        check_in.dogId
      );
      return {
        ...state,
        allCheckIns: state.allCheckIns.concat(newCheckIn)
      };
    case CHECKOUT:
      return {
        ...state,
        allCheckIns: state.allCheckIns.filter(
          checkin => checkin.id !== action.id
        )
      };

    default:
      return state;
  }
};
