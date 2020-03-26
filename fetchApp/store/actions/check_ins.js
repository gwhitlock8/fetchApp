import CheckIn from "../../models/check_in";

export const CREATE_CHECK_IN = "CREATE_CHECK_IN";
export const CHECKOUT = "CHECKOUT";
export const SET_CHECK_INS = "SET_CHECK_INS";

export const checkIn = (dogParkId, dogId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch("http://localhost:3000/check_ins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        dog_park_id: dogParkId,
        dog_id: dogId
      })
    });

    const resData = await response.json();

    dispatch({
      type: CREATE_CHECK_IN,
      check_in: {
        id: resData.checkin.id,
        dogParkId,
        dogId
      }
    });
  };
};

export const checkout = checkInId => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `http://localhost:3000/check_ins/${checkInId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    );
    dispatch({ type: CHECKOUT, id: checkInId });
  };
};

export const fetchCheckIns = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch("http://localhost:3000/check_ins", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const resData = await response.json();
    const loadedCheckIns = [];
    resData.checkins.forEach(checkin => {
      loadedCheckIns.push(
        new CheckIn(checkin.id, checkin.dog_park_id, checkin.dog_id)
      );
    });
    dispatch({ type: SET_CHECK_INS, checkins: loadedCheckIns });
  };
};
