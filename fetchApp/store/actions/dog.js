import Dog from "../../models/dog";

export const CREATE_DOG = "CREATE_DOG";
export const UPDATE_DOG = "UPDATE_DOG";
export const DELETE_DOG = "DELETE_DOG";
export const SET_DOGS = "SET_DOGS";

export const fetchDogs = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.user.id;
    const response = await fetch("http://localhost:3000/dogs", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const resData = await response.json();
    console.log(resData.dogs);
    const loadedDogs = [];
    resData.dogs.forEach(dog => {
      loadedDogs.push(
        new Dog(
          dog.id,
          dog.user_id,
          dog.name,
          dog.breed,
          dog.age,
          dog.weight,
          dog.temperment,
          dog.likes,
          dog.dislikes,
          dog.imageUrl
        )
      );
    });

    dispatch({ type: SET_DOGS, dogs: loadedDogs, userId });
  };
};

export const deleteDog = dogId => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    const response = await fetch(`http://localhost:3000/dogs/${dogId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    dispatch({ type: DELETE_DOG, id: dogId });
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
    const userId = getState().auth.user.id;
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
        imageUrl,
        userId
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
