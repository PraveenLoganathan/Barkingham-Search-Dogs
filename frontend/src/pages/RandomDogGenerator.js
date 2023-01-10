import React from "react";
import { useEffect, useState } from "react";
import dogAPI from "../api/dogAPI";
import mongoAPI from "../api/mongoAPI";
import SingleDog from "../components/SingleDog";

const RandomDogGenerator = () => {
  // State variables to store the breed, image URL, favorite status, average rating, and rating count
  const [breed, setBreed] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [avgRating, setAvgRating] = useState("");
  const [ratingCount, setRatingCount] = useState("");

  // Function to get a random dog image and set the breed and image URL
  const getPicture = () => {
    setImageURL("");
    setBreed("");
    dogAPI.getRandomDog().then((response) => {
      const url = response.data.message;
      const substrings = url.split("/");
      setBreed(substrings[4]);
      setImageURL(url);
    });
  };

  // Function to add the current breed to the favorites list
  const addToFavorites = async () => {
    try {
      const response = await mongoAPI.addToFavorites(breed, imageURL);
      setIsFavorite(true);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to remove the current breed from the favorites list
  const removeFromFavorites = async () => {
    try {
      const response = await mongoAPI.removeFromFavorites(breed);
      setIsFavorite(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to get the average rating and rating count for the current breed
  const getAvgRating = async () => {
    try {
      const response = await mongoAPI.getRating(breed);
      const rating = response.data[0].weightedAvg;
      const count = response.data[0].ratingCount;
      setAvgRating(rating);
      setRatingCount(count);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to add a rating for the current breed
  const addRating = async (currentUserRating) => {
    try {
      const response = await mongoAPI.addRating(
        breed,
        currentUserRating,
        imageURL
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Object containing the functions to be passed to the SingleDog component as props
  const breedContextValue = {
    addToFavorites,
    removeFromFavorites,
    getAvgRating,
    addRating,
    getPicture,
  };

  // Get a random dog image and the average rating and rating count when the component mounts
  useEffect(() => {
    getPicture();
    getAvgRating();
  }, []);

  return (
    <SingleDog
      imageURL={imageURL}
      breed={breed}
      isFavorite={isFavorite}
      avgRating={avgRating}
      ratingCount={ratingCount}
      context={breedContextValue}
    />
  );
};

export default RandomDogGenerator;
