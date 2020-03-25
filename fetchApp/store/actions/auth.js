export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

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
    dispatch({
      type: SIGNUP,
      user: resData.user,
      token: resData.jwt
    });
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
    dispatch({
      type: LOGIN,
      user: resData.user,
      token: resData.jwt
    });
  };
};
