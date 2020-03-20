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
  return dispatch => {
    //execute async code
    fetch("http");
    dispatch({
      type: CREATE_DOG,
      dog: {
        id: Math.floor(Math.random() * 1000),
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
  return {
    type: UPDATE_DOG,
    id: dogId,
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
  };
};
