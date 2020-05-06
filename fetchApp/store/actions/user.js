import User from "../../models/user";

export const SET_USER = "SET_USER";
export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_PASSWORD = "UPDATE_PASSWORD";

export const fetchUser = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.user.id;
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const resData = await response.json();
    const user = resData.user;
    const loadedUser = new User(
      user.id,
      user.first_name,
      user.last_name,
      user.email,
      user.address,
      user.city,
      user.state,
      user.zip
    );

    dispatch({ type: SET_USER, user: loadedUser });
  };
};

export const updateUser = (
  first_name,
  last_name,
  email,
  address,
  city,
  state,
  zip
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.user.id;
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        address,
        city,
        state,
        zip
      })
    });

    const resData = await response.json();

    dispatch({
      type: UPDATE_USER,
      user: {
        first_name,
        last_name,
        email,
        address,
        city,
        state,
        zip
      }
    });
  };
};

export const updatePassword = (password, password_confirmation) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.user.id;
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        password,
        password_confirmation
      })
    });

    const resData = await response.json();

    dispatch({
      type: UPDATE_PASSWORD,
      dog: {
        password,
        password_confirmation
      }
    });
  };
};
