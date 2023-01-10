import React, { useState } from "react";
import StarRating from "./StarRating";
import Button from "./Button";
import Card from "./Card";

// The SingleDog component displays a single dog with its breed, image URL, and allows the user to add or remove it from their favorites,
// and submit their rating.
const SingleDog = ({
  imageURL,
  breed,
  isFavorite,
  avgRating,
  ratingCount,
  context,
}) => {
  // Get the addToFavorites, removeFromFavorites, addRating, and getPicture functions from the context prop
  const { addToFavorites, removeFromFavorites, addRating, getPicture } =
    context;
  // Define the selected state variable to store the selected rating value, and set its initial value to 0
  const [selected, setSelected] = useState(0);

  // The handleSelected function sets the selected state variable to the rating value passed to it
  const handleSelected = (rating) => {
    setSelected(rating);
  };

  // The handleSubmitRating function submits the selected rating value to the server using the addRating function from the BreedContext
  const handleSubmitRating = () => {
    console.log(selected);
    addRating(selected);
  };

  return (
    // The Card component displays the dog's image and breed, and allows the user to refresh the image.
    <Card imageURL={imageURL} breed={breed} getPicture={getPicture}>
      <p className="mb-3 text-brown">
        Avg User Rating: <span className="text-lighter-brown">{avgRating}</span>
      </p>
      <p className="mb-3 text-brown">
        No. of User Ratings:{" "}
        <span className="text-lighter-brown">{ratingCount}</span>
      </p>
      <p className="mb-3 text-brown">
        Please submit your rating:{" "}
        <span>
          <StarRating
            // The StarRating component allows the user to select a rating
            count={5}
            currentRating={(rating) => handleSelected(rating)}
          />
        </span>
      </p>
      <div className="mb-6"></div>
      <div className="flex gap-3 mt-auto">
        {/* The Submit Rating button calls the handleSubmitRating function when clicked */}
        <Button text={"Submit Rating"} onClick={handleSubmitRating} />
        {isFavorite ? (
          // The Remove Favorites button calls the removeFromFavorites function from the BreedContext when clicked
          <Button text="Remove Favorites" onClick={removeFromFavorites} />
        ) : (
          // The Add Favorites button calls the addToFavorites function from the BreedContext when clicked
          <Button text={"Add Favorites"} onClick={addToFavorites} />
        )}
      </div>
    </Card>
  );
};

export default SingleDog;
