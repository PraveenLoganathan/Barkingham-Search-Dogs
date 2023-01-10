import axios from "axios";

// Attempts to register a new user with the provided username and password
// Returns the server's response if successful, or throws an error if the registration attempt fails
async function attemptRegister(username, password) {
  // Send a POST request to the server with the provided username and password
  const response = await axios({
    method: "POST",
    withCredentials: true,
    data: {
      username: username,
      password: password,
    },
    url: "http://localhost:4000/users/register",
  });
  return response.data;
}

// Attempts to log in a user with the provided username and password
async function attemptLogin(username, password) {
  // Send a POST request to the server with the provided username and password
  const response = await axios({
    method: "POST",
    withCredentials: true,
    data: {
      username: username,
      password: password,
    },
    url: "http://localhost:4000/users/login",
  });
  return response.data;
}

async function Logout() {
  // Send a POST request to the server with the provided username and password
  const response = await axios({
    method: "GET",
    withCredentials: true,
    url: "http://localhost:4000/users/logout",
  });
  return response.data;
}

async function checkAuthenticated() {
  const response = await axios({
    method: "GET",
    withCredentials: true,
    url: "http://localhost:4000/users/checkAuthenticated",
  });
  return response.data;
}
//----------------------------------------- END OF Authentication Routes---------------------------------------------------

// Adds a breed to the user's favorite breeds list
async function getFavorites() {
  // Make a POST request to the server to fech favorites
  const response = await axios({
    method: "GET",
    withCredentials: true,
    url: `http://localhost:4000/favorites/get`,
  });
  return response;
}

// Adds a breed to the user's favorite breeds list
async function addToFavorites(breed, url) {
  if (!breed || !url) {
    throw new Error("No breed or url provided");
  }
  // Make a POST request to the server with the breed to add
  const response = await axios({
    method: "POST",
    withCredentials: true,
    url: `http://localhost:4000/favorites/add/${breed}`,
    data: { breed, url },
  });
  return response;
}

// Adds a breed to the user's favorite breeds list
async function removeFromFavorites(breed) {
  if (!breed) {
    throw new Error("No breed provided");
  }

  // Make a POST request to the server with the breed to add
  const response = await axios({
    method: "PATCH",
    withCredentials: true,
    url: `http://localhost:4000/favorites/remove/:${breed}`,
  });
  return response;
}

//----------------------------------------- END OF User Favorites Routes---------------------------------------------------

// Asynchronously retrieves the rating for a breed
// Returns the rating as a number
async function getRating(breed) {
  if (!breed) {
    throw new Error("No breed provided");
  }
  // Make a GET request to the server with the breed to get the rating for
  const response = await axios({
    method: "GET",
    withCredentials: true,
    url: `http://localhost:4000/ratings/${breed}`,
  });

  return response.data;
}

// Asynchronously retrieves the ratings for all breeds
// Returns the avg weighted rating as a number
async function getAllRating(filter = "asc order") {
  // Make a GET request to the server with the filter to get the ratings for all breeds
  const response = await axios({
    method: "GET",
    withCredentials: true,
    url: `http://localhost:4000/ratings/allRatings/${filter}`,
  });

  return response.data;
}

// Asynchronously adds a rating and image URL for a breed to the database
// Returns the server's response message if successful, or throws an error if the add attempt fails
async function addRating(breed, currentUserRating, imageURL) {
  // Send a POST request to the server with the provided breed, rating, and imageURL values
  const response = await axios({
    method: "POST",
    withCredentials: true,
    data: {
      rating: currentUserRating,
      url: imageURL,
    },
    url: `http://localhost:4000/ratings/add/${breed}`,
  });
  return response.data;
}

//----------------------------------------- END OF User Ratings Routes ---------------------------------------------------

export default {
  attemptLogin,
  attemptRegister,
  Logout,
  checkAuthenticated,
  addToFavorites,
  getFavorites,
  removeFromFavorites,
  addRating,
  getRating,
  getAllRating,
};
