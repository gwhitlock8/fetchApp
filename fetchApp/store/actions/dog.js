export const CREATE_DOG = "CREATE_DOG";
export const UPDATE_DOG = "UPDATE_DOG";
export const DELETE_DOG = "DELETE_DOG";

export const deleteDog = dogId => {
  return {
    type: DELETE_DOG,
    dogId: dogId
  };
};

export const createDog = (
  name,
  breed,
  age,
  weight,
  temperment,
  likes,
  dislikes,
  imageUrl
) => {
  return async (dispatch, getState) => {
    //execute async code
    const token = getState().auth.token;
    const userId = getState().auth.user.id.toString();
    console.log(token);
    const response = await fetch("http://localhost:3000/dogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        user_id: userId,
        name,
        breed,
        age,
        weight,
        temperment,
        likes,
        dislikes,
        imageUrl
      })
    });

    const resData = await response.json();

    console.log(resData);

    dispatch({
      type: CREATE_DOG,
      dog: {
        name,
        breed,
        age,
        weight,
        temperment,
        likes,
        dislikes,
        imageUrl
      }
    });
  };
};

export const updateDog = (
  dogId,
  name,
  breed,
  age,
  weight,
  temperment,
  likes,
  dislikes,
  imageUrl
) => {
  return async (dispatch, getState) => {
    //execute async code
    const token = getState().auth.token;
    const response = await fetch(`http://localhost:3000/dog/${dogId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        breed,
        age,
        weight,
        temperment,
        likes,
        dislikes,
        imageUrl
      })
    });

    const resData = await response.json();

    console.log(resData);

    dispatch({
      type: UPDATE_DOG,
      dog: {
        name,
        breed,
        age,
        weight,
        temperment,
        likes,
        dislikes,
        imageUrl
      }
    });
  };
};
