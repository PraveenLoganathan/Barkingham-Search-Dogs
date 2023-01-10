import React from "react";
import { useEffect, useMemo, useState } from "react";
import dogAPI from "../api/dogAPI";
import DogBreedList from "../components/DogBreedList";
import Input from "../components/Input";

const DogBreeds = () => {
  const [breeds, setBreeds] = useState([]);
  const [search, setSearch] = useState("");

  // Get list of all master breeds available from the dog api
  const getDogBreeds = () => {
    dogAPI.getMasterBreeds().then((response) => {
      setBreeds(response.data.message);
    });
  };

  // Fetches list of all master breeds on the first render
  useEffect(() => {
    getDogBreeds();
  }, []);

  // Saves the current value in search bar in state variable
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  // Filters data based on search state variable and caches each filter attempt using useMemo hook
  const filteredList = useMemo(() => {
    return breeds.filter((item) => {
      return item.toLowerCase().includes(search.toLowerCase());
    });
  }, [breeds, search]);

  return (
    <section className="p-8 max-w-7xl mx-auto">
      <div className="text-center">
        <h1 className="flex items-center justify-center text-center px-5 text-3xl font-bold lg:text-5xl text-brown">
          Master Breeds
        </h1>
        <p className="my-8 text-brown">
          This application is powered by{" "}
          <a
            href="https://dog.ceo/dog-api/"
            className="text-lighter-brown underline"
          >
            The Dog Api
          </a>
        </p>

        <form className="max-w-xl mx-auto" autoComplete="off">
          <Input
            type="text"
            name="search"
            placeholder="Search for a dog / breed"
            value={search}
            onChange={handleSearch}
          />
        </form>
      </div>
      <DogBreedList breeds={filteredList} />
    </section>
  );
};

export default DogBreeds;
