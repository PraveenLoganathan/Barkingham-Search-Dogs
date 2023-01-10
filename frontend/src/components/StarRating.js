import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

// The Star component represents a single star in the star rating system
const Star = ({ selected, handleClick, handleMouseOut, handleMouseOver }) => {
  return (
    <FontAwesomeIcon
      icon={faStar}
      size="xl"
      color={selected ? "orange" : "grey"}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    />
  );
};

// The StarRating component represents the entire star rating system
const StarRating = ({ count, currentRating }) => {
  // The selected state variable holds the current rating (0-5)
  let [selected, setSelected] = useState(0);
  // The hover state variable holds the rating that the user is currently hovering over (0-5)
  let [hover, setHover] = useState(null);

  // Use the useEffect hook to update the currentRating prop whenever the selected state variable changes
  useEffect(() => {
    currentRating(selected);
  }, [selected]);

  // Create an array of Star components, with one element for each star in the rating system
  const elems = [...Array(count)].map((_, i) => {
    return (
      <Star
        key={i}
        // The selected prop determines whether the star is highlighted or not
        selected={(hover || selected) > i}
        // The handleClick prop is a function that sets the selected state variable to the index of the clicked star + 1
        handleClick={() => setSelected(i + 1)}
        // The handleMouseOver prop is a function that sets the hover state variable to the index of the hovered-over star + 1
        handleMouseOver={() => {
          setHover(i + 1);
        }}
        // The handleMouseOut prop is a function that sets the hover state variable back to null
        handleMouseOut={() => setHover(null)}
      />
    );
  });

  return elems;
};

export default StarRating;
