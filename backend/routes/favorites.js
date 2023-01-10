var express = require("express");
var router = express.Router();
const passport = require("passport");
const Favorites = require("../models/favorite");

router.get("/get", checkAuthentication, async (req, res) => {
  const userId = req.session.passport.user;
  console.log(userId);

  try {
    const favorites = await Favorites.findByUserId(userId);
    if (favorites === null) {
      return res.status(404).send({
        message: "User has no favorites",
      });
    } else {
      res.status(200).send({
        favorites,
      });
    }
  } catch (error) {
    res.status(500).send({
      error: "Error retrieving favorites",
    });
  }
});

router.post("/add/:breed", checkAuthentication, async (req, res) => {
  const userId = req.session.passport.user;
  const { breed } = req.params;
  const { url } = req.body;
  try {
    // Check if the user already has a favorites document
    const favorites = await Favorites.findOne({
      userId,
    });

    if (!favorites) {
      // If the user doesn't have a favorites document, create one
      const newFavorites = new Favorites({
        userId: userId,
        breeds: [{ name: breed, url: url }],
      });
      await newFavorites.save();
    } else {
      // If the user already has a favorites document, update it
      const update = {
        $addToSet: {
          breeds: { name: breed, url: url },
        },
      };
      console.log(update);
      await Favorites.updateOne(
        {
          userId,
        },
        update
      );
    }

    res.status(200).send({
      message: "Breed added to favorites",
    });
  } catch (error) {
    res.status(500).send({
      error: "Error adding breed to favorites",
    });
  }
});

router.patch("/remove/:breed", checkAuthentication, async (req, res) => {
  const userId = req.session.passport.user;
  const breed = req.params.breed;

  try {
    await Favorites.updateOne(
      {
        userId,
      },
      {
        $pull: {
          breeds: breed,
        },
      }
    );

    res.status(200).send({
      message: "Breed removed from favorites",
    });
  } catch (error) {
    res.status(500).send({
      error: "Error removing breed from favorites",
    });
  }
});

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
