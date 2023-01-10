var express = require("express");
var router = express.Router();
const passport = require("passport");
const Dog = require("../models/dog");

// Add a rating to a dog
router.post("/add/:breed", checkAuthentication, async (req, res) => {
  const breed = req.params.breed;
  const { url, rating } = req.body;
  const userId = req.session.passport.user;

  try {
    // Check if the dog exists
    let dog = await Dog.findOne({
      breed: breed,
    });
    if (!dog) {
      // If the dog does not exist, create a new dog document
      dog = new Dog({
        breed: breed,
        url: url,
        ratings: [
          {
            userId: userId,
            rating: rating,
          },
        ],
      });
      await dog.save();
      res.status(201).send({
        message: "Successfully created new dog and added rating",
      });
      return;
    }

    // Check if the user has already rated the dog
    const hasRated = await hasUserRatedDog(breed, userId);
    if (hasRated) {
      res.status(409).send({
        error: "Conflict",
        message: "User has already rated dog",
      });
      return;
    }

    // Update the dog document
    const updatedDog = await Dog.updateDog(breed, url, userId, rating);

    res.status(201).send({
      message: "Sucessfully added rating",
    });
  } catch (error) {
    res.status(500).send({
      error: "Error adding rating to dog",
    });
  }
});

// Filter breeds based on avg weighted rating in ascending or descending order:
router.get("/allRatings/:filter", async (req, res) => {
  const { filter } = req.params;
  console.log(filter)
  let order = 0;

  if (filter === "asc order") {
    order = 1;
  } else if (filter === "dsc order") {
    order = -1;
  } else {
    return res.status(400).send({
      error: "Invalid request",
      message: "Filter parameter must be 'asc order' or 'dsc order'",
    });
  }

  try {
    const dogs = await Dog.sortByWeightedAverage(order);
    res.status(200).send({
      message: "Successfully retrieved sorted list of dogs",
      data: dogs,
    });
  } catch (error) {
    res.status(500).send({
      error: "Error sorting dogs",
      message: "Failed to retrieve sorted list of dogs",
    });
  }
});

// Get avg weighted rating for a breed
router.get("/:breed", async (req, res) => {
  const { breed } = req.params;

  try {
    const avgRating = await Dog.getWeightedAvg(breed);
    res.status(200).send({
      message: "Successfully retrieved avg dog rating",
      data: avgRating,
    });
  } catch (error) {
    res.status(500).send({
      error: "Error retrieving dog rating",
      message: "Failed to retrieve avg dog rating",
    });
  }
});

// Middleware to check if user has already rated a breed
async function hasUserRatedDog(breed, userId) {
  const dog = await Dog.findOne({
    _breed: breed,
    "ratings.userId": userId,
  });
  // If dog is null or undefined then !! evaluates to 'false', if dog is any other value then evaluates to 'true'
  return !!dog;
}

// Middleware checks whether user has been authenticated
function checkAuthentication(req, res, next) {
  console.log(req.user);
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send({
      error: "You are not authenticated",
    });
  }
}

module.exports = router;
