import React, { useState, createContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DogBreeds from "./pages/DogBreeds";
import RandomDogWithBreed from "./pages/RandomDogWithBreed";
import RandomDogGenerator from "./pages/RandomDogGenerator";
import Favorites from "./pages/Favorites";
import mongoAPI from "./api/mongoAPI";

// Creates a context object that can be used to share data with components that are descendants of the provider
export const AuthContext = createContext();

const App = () => {
  // Stores the default state for links, requires work in order for it to render the logout button conditionally
  const links = [
    { label: "Dog Breeds", path: "/breeds" },
    { label: "Random Dog", path: "/random" },
    { label: "Favorites", path: "/favorites" },
  ];

  // Keeps track of whether the user is authenticated or not
  const [authenticated, setAuthenticated] = useState(false);

  // Calls the checkAuthenticated function when the component mounts
  useEffect(() => {
    checkAuthenticated();
  }, []);

  // Makes a request to the server to check if the user is authenticated
  const checkAuthenticated = async () => {
    try {
      const response = await mongoAPI.checkAuthenticated();
      // If the response contains a username, the user is authenticated
      if (response.username) {
        setAuthenticated(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Logs the user out and updates the authenticated state to false
  const logoutHandler = () => {
    // Makes a request to the server to log the user out
    const response = mongoAPI.Logout();
    // Updates the authenticated state to false
    setAuthenticated(false);
    console.log(response);
  };

  // Creates the value for the context provider
  const authContextValue = {
    authenticated,
    setAuthenticated,
    logoutHandler,
  };

  return (
    <div className="App">
      {/* Provides the authContextValue to components that are descendants of this provider */}
      <AuthContext.Provider value={authContextValue}>
        {/* Renders the NavBar component and passes it the links prop */}
        <NavBar links={links} />
        {/* Renders the Routes component and its children Route components */}
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route path="/breeds" element={<DogBreeds />} />
          <Route path="/breeds/:breed" element={<RandomDogWithBreed />} />
          <Route path="/random" element={<RandomDogGenerator />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
