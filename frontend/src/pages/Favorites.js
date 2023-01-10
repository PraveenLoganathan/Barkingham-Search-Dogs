import React from "react";
import { useEffect, useState } from "react";
import classNames from "classnames";
import mongoAPI from "../api/mongoAPI";
import Card from "../components/Card";
import Button from "../components/Button";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [breed, setBreed] = useState("");

  const divClassNames = {
    base: "grid",
    cols: "grid-cols-1 md:grid-cols-1 xl:grid-cols-1",
  };

   // Get user's favorites when the component mounts
   useEffect(() => {
    getFavorites();
  }, []);

  // Function to get user's favorite breeds
  const getFavorites = async () => {
    try {
      const response = await mongoAPI.getFavorites();
      setFavorites(response.data.favorites.breeds);
    } catch (error) {
      console.log(error);
    }
  };

  // Work in progress Function to remove the current breed from the favorites list
  const removeFromFavorites = async (name) => {
    try {
      const response = await mongoAPI.removeFromFavorites(name);
      setFavorites(favorites.filter((b) => b !== breed));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={classNames(
        divClassNames.base,
        divClassNames.cols,
        divClassNames.margins
      )}
    >
      {favorites.map((breed) => {
        return (
          <div key={breed.name}>
            <Card imageURL={breed.url} breed={breed.name}>
              {/* Work in progress - The Remove Favorites button calls the removeFromFavorites function from the BreedContext when clicked */}
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default Favorites;
