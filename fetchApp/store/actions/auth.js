import { AsyncStorage } from "react-native";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const AUTHENTICATE = "AUTHENTICATE";

export const authenticate = (user, token) => {
  return { type: AUTHENTICATE, user: user, token: token };
};

export const signup = (
  email,
  password,
  first_name,
  last_name,
  address,
  city,
  state,
  zip
) => {
  return async dispatch => {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
        first_name,
        last_name,
        address,
        city,
        state,
        zip
      })
    });

    if (!response.ok) {
      const errorResData = await response.json();
      let message = errorResData.message;
      throw Error(message);
    }

    const resData = await response.json();
    dispatch(authenticate(resData.user, resData.jwt));
    const expirationDate = new Date(new Date().getTime() + 10000 * 1000);
    saveDataToStorage(resData.jwt, resData.user, expirationDate);
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    if (!response.ok) {
      const errorResData = await response.json();
      const message = errorResData.message;
      throw Error(message);
    }

    const resData = await response.json();
    dispatch(authenticate(resData.user, resData.jwt));
    const expirationDate = new Date(new Date().getTime() + 10000 * 1000);
    console.log(expirationDate);
    saveDataToStorage(resData.jwt, resData.user, expirationDate);
  };
};

const saveDataToStorage = (token, user, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      user: user,
      expiryDate: expirationDate.toISOString()
    })
  );
};
