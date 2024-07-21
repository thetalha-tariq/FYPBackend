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
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Cancelled'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

const appointmentModel = mongoose.model('Appointment', appointmentSchema);

module.exports = appointmentModel;
