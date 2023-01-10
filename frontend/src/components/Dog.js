import React from "react";

const styles = {
  container: {
    height: "10em"
  },
  img: {
    height: "90%",
  },
};

const Dog = ({ imageURL, onClick }) => (
  <div 
    className="lg:w-1/2 full object-cover"
    onClick={onClick}
  >
    {imageURL ? <img style={styles.img} alt="" src={imageURL} /> : "loading..."}
  </div>
);

export default Dog;


//className="lg:w-1/2 full object-cover"
