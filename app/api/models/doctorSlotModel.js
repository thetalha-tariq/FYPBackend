const mongoose = require('mongoose');

const doctorSlotSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    slotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Slot',
      required: true,
    },
    day: {
      type: String,
      required: true,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    },
    date: {
      type: Date,
      required: true,
    },
    booked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const doctorSlotModel = mongoose.model('DoctorSlot', doctorSlotSchema);

module.exports = doctorSlotModel;
