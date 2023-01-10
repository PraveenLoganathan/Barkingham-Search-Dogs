const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  breeds: [
    {
      name: {
        type: String,
        required: true,
        maxLength: 100,
      },
      url: {
        type: String,
        required: true,
        maxLength: 254,
      },
    },
  ],
});

favoriteSchema.statics.findByUserId = function (userId) {
  return this.findOne({
    userId: userId,
  }).populate("userId");
};

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;
