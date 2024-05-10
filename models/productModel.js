const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: String,
  imageUrl: String,
  stockQuantity: {
    type: Number,
    required: true,
    min: 0
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

const productModel = mongoose.model('products', productSchema);

module.exports = productModel;
