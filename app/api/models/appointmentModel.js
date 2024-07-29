const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: false,
    },
    doctorSlotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DoctorSlot',
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Cancelled'],
      default: 'Pending',
    },
    name:{
      type: String,
    },
    email:{
      type: String,
    },
    phone:{
      type:String,
    },
    petName:{
      type:String,
    },
    disease:{
      type:String,
    },
    groomingService:{
      type:String,
    }
  },
  {
    timestamps: true,
  }
);

const appointmentModel = mongoose.model('Appointment', appointmentSchema);

module.exports = appointmentModel;
