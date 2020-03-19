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
  temperment,
  likes,
  dislikes,
  imageUrl
) => {
  return {
    type: CREATE_DOG,
    dog: {
      id: Math.floor(Math.random() * 1000).toString(),
      name,
      breed,
      age,
      temperment,
      likes,
      dislikes,
      imageUrl
    }
  };
};

export const updateDog = (
  id,
  name,
  breed,
  age,
  temperment,
  likes,
  dislikes,
  imageUrl
) => {
  return {
    type: UPDATE_DOG,
    id: id,
    dog: {
      name,
      breed,
      age,
      temperment,
      likes,
      dislikes,
      imageUrl
    }
  };
};
