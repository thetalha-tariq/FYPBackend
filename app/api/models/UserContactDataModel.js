const mongoose = require("mongoose");

const UserContactDataSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: false,
    },
    name: {
      type: String,
      reqried: true,
    },
    email: {
      type: String,
      reqried: true,
    },
    phone: {
      type: String,
      reqried: true,
    },
    message: {
      type: String,
      reqried: true,
    },

  },
  {
    timestamps: true,
  }
);

const UserContactDataModel = mongoose.model("UserContactData", UserContactDataSchema);

module.exports = UserContactDataModel;