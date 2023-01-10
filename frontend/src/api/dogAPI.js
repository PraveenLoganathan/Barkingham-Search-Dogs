import axios from "axios";

const getRandomDog = () => axios.get("https://dog.ceo/api/breeds/image/random");

const getMasterBreeds = () => axios.get("https://dog.ceo/api/breeds/list");

const getRandomDogWithBreed = (breed) =>
  axios.get(`https://dog.ceo/api/breed/${breed}/images/random`);

export default {
  getRandomDog,
  getMasterBreeds,
  getRandomDogWithBreed,
};
