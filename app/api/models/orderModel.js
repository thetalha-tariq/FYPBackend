const mongoose = require("mongoose");

const userModel = require("../models/userModel")

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    order:
      [{
        productId: { type: String, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true }
      }]
    ,

    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },

    paymentMethod: {
      type: String,

      default: "online"
    },

    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },


    },

    shippingPrice: {
      type: Number,

      default: 200.0,
    },

    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },

    isPaid: {
      type: Boolean,

      default: true,
    },

    isProcessed: {
      type: Boolean,

      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
