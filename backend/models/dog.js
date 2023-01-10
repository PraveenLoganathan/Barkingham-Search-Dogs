const mongoose = require("mongoose");

const dogSchema = new mongoose.Schema({
  breed: {
    type: String,
    required: true,
    maxLength: 100,
  },
  url: {
    type: String,
    required: true,
    maxLength: 254,
  },
  ratings: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
      },
    },
  ],
});

dogSchema.statics.updateDog = function (breed, url, userId, rating) {
  const update = {
    $set: {
      url: url,
    },
    $push: {
      ratings: {
        userId: userId,
        rating: rating,
      },
    },
  };
  const options = {
    upsert: true,
  };
  return this.findOneAndUpdate(
    {
      breed: breed,
    },
    update,
    options
  );
};

dogSchema.statics.getWeightedAvg = function (breed) {
  return this.aggregate([
    {
      $match: {
        // Filters the documents in the dog collection by the specified breed
        breed: breed,
      },
    },
    {
      $unwind: "$ratings", // Deconstructs the ratings array field from the input documents and creates a new document for each element
    },
    {
      $group: {
        // Groups documents by the _id field and calaculates total sum of ratings and no. of ratings for each group
        _id: "$_id",
        breed: {
          $first: "$breed",
        },
        url: {
          $first: "$url",
        },
        ratingsTotal: {
          $sum: "$ratings.rating",
        },
        ratingCount: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        // Reshapes the documents in pipeline and calculates weighted avg
        _id: 0,
        breed: 1, // 1 specifies that the value of the breed field should be included in the final documents
        url: 1,
        ratingCount: 1,
        weightedAvg: {
          $divide: ["$ratingsTotal", "$ratingCount"],
        },
      },
    },
  ]);
};

dogSchema.statics.sortByWeightedAverage = function (order) {
  return this.aggregate([
    {
      $unwind: "$ratings",
    },
    {
      $group: {
        _id: "$_id",
        breed: {
          $first: "$breed",
        },
        url: {
          $first: "$url",
        },
        ratingsTotal: {
          $sum: "$ratings.rating",
        },
        ratingCount: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,
        breed: 1,
        url: 1,
        weightedAvg: {
          $divide: ["$ratingsTotal", "$ratingCount"],
        },
      },
    },
    {
      $sort: {
        weightedAvg: order,
      },
    },
  ]);
};

const Dog = mongoose.model("Dog", dogSchema);

module.exports = Dog;
