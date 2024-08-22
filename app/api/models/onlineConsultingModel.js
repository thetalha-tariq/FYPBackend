const mongoose = require('mongoose');

const onlineConsultingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  petName: {
    type: String,
    required: true
  },
  disease: {
    type: String,
    required: true
  },
  approveByDoctor:{
    type:Boolean,
    default:false
  },
  isPayed:{
    type:Boolean,
    default:false
  },
  zoomLink: { type: String },
}, {
  timestamps: true
});

const OnlineConsulting = mongoose.model('OnlineConsulting', onlineConsultingSchema);

module.exports = OnlineConsulting;
