const mongoose = require("mongoose");

const DoctorContactDataSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
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

const DoctorContactDataModel = mongoose.model("DoctorContactData", DoctorContactDataSchema);

module.exports = DoctorContactDataModel;