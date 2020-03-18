export const CHECK_IN = "CHECK_IN";
export const CHECKOUT = "CHECKOUT";

export const checkIn = dogPark => {
  return {
    type: CHECK_IN,
    dogPark: dogPark
  };
};

export const checkout = dogPark => {
  return {
    type: CHECKOUT,
    dogPark: dogPark
  };
};
