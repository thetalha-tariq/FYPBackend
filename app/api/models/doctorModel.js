const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password:{
      type:String,
      required:false,
      unique:true,
    },
    phone: {
      type: String,
      required: false,
      unique: true,
    },
    slotsPerDay: {
      type: Number,
      default: 4,
    },
    role:{
      type:String,
      default:"doctor",
    },
  },
  {
    timestamps: true,
  }
);

const doctorModel = mongoose.model('Doctor', doctorSchema);

module.exports = doctorModel;
