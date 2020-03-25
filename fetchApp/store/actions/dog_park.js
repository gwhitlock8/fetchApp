import DogPark from "../../models/dog_park";

export const SET_DOG_PARKS = "SET_DOG_PARKS";

export const fetchDogParks = () => {
  return async dispatch => {
    const response = await fetch("http://localhost:3000/dog_parks");

    const resData = await response.json();
    console.log(resData);
    const loadedDogParks = [];
    resData.parks.forEach(park => {
      loadedDogParks.push(
        new DogPark(
          park.id,
          park.name,
          park.location,
          park.imageUrl,
          park.description,
          park.overall_rating,
          park.fenced,
          park.off_leash
        )
      );
    });
    dispatch({ type: SET_DOG_PARKS, parks: loadedDogParks });
  };
};
