import { UPDATE_PASSWORD, UPDATE_USER, SET_USER } from "../actions/user";

const initialState = {
  loggedInUser: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        loggedInUser: action.user
      };
    case UPDATE_USER:
      return {
        loggedInUser: action.user
      };
  }
};
