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
    console.log(response);

    if (response.code == 500) {
      const errorResData = await response.json();
      console.log("SIGNUP error response data >>>> ", errorResData);
      let message = errorResData.message;
      throw new Error(message);
    }

    const resData = await response.json();
    console.log("SIGNUP response data >>>> ", resData);
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
      console.log("error response data >>>> ", errorResData);
      throw new Error(message);
    }

    const resData = await response.json();
    console.log("response data >>>> ", resData);
    dispatch({
      type: LOGIN,
      user: resData.user,
      token: resData.jwt
    });
  };
};
