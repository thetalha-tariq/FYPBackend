const Order = require('../models/orderModel');
const mongoose = require('mongoose');

module.exports = {
  create: async (req, res, next) => {
    try {
      console.log("Received create order request:", req.body);
      const newOrder = new Order(req.body);

      await newOrder.save();
      res
        .status(200)
        .send({ message: "Order Created Successfully", success: true, order: newOrder });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "Error Creating Order", success: false, error });
    }
  },

  update: async (req, res, next) => {
    try {
      console.log("Received update order request:", req.body);
      const orderId = req.params.id;
      const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, { new: true });

      if (!updatedOrder) {
        return res
          .status(404)
          .send({ message: "Order Not Found", success: false });
      }

      res
        .status(200)
        .send({ message: "Order Updated Successfully", success: true, order: updatedOrder });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "Error Updating Order", success: false, error });
    }
  },

  delete: async (req, res, next) => {
    try {
      console.log("Received delete order request:", req.params);
      const orderId = req.params.id;
      const deletedOrder = await Order.findByIdAndDelete(orderId);

      if (!deletedOrder) {
        return res
          .status(404)
          .send({ message: "Order Not Found", success: false });
      }

      res
        .status(200)
        .send({ message: "Order Deleted Successfully", success: true, order: deletedOrder });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "Error Deleting Order", success: false, error });
    }
  },
  getAll: async (req, res, next) => {
    try {
      console.log("Received get all orders request");
      const orders = await Order.find()
        .populate('user', 'name email') // Populate user with name and email
        .populate('orderItems.product', 'name price'); // Populate order items with product name and price

      if (!orders || orders.length === 0) {
        return res
          .status(404)
          .send({ message: "No Orders Found", success: false });
      }

      res
        .status(200)
        .send({ message: "Orders Retrieved Successfully", success: true, orders });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "Error Retrieving Orders", success: false, error });
    }
  },
};
