/** @format */

export const PROD_REST_API_URL = "https://pure-beyond-32158.herokuapp.com";

export const PROD_REST_API_IMG_URL =
  "https://pure-beyond-32158.herokuapp.com/uploads";

const randRatings = [8.4, 6.9, 9.2, 8.8, 7.6, 4.9, 9.9, 5.5, 3.2, 5.7];

export const getRandomRatingForMovie = () => {
  const random = Math.floor(Math.random() * randRatings.length);
  return randRatings[random];
};
