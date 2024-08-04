const mongoose = require('mongoose');

const Order = require('../models/orderModel');
const Product = require('../models/productModel');

const createOrder = async (req, res) => {
  const { userId, orderItems, shippingPrice, address, city, country, paymentMethod, totalPrice } = req.body;

  try {
    const newOrder = new Order({
      userId,
      order: orderItems,
      address,
      city,
      country,
      shippingPrice,
      paymentMethod,
      totalPrice,
    });

    console.log("newOrder:", newOrder);
    const savedOrder = await newOrder.save();

    // Update product quantities
    const updateProductQuantities = orderItems.map(async (item) => {
      const product = await Product.findById(item.productId);
      if (product) {
        product.quantity -= item.quantity;
        await product.save();
      } else {
        throw new Error(`Product with ID ${item.productId} not found`);
      }
    });

    await Promise.all(updateProductQuantities);

    res.status(201).json(savedOrder);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// New function to get order by ID
const getOrderById = async (req, res) => {
  const { id } = req.params;
  // console.log("id is::", id)
  try {
    const orders = await Order.find({ userId: id });
    console.log("object", orders)
    if (orders) {
      res.json(orders);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update order status to processed and adjust product quantities
const updateOrderStatus = async (req, res) => {
  console.log("in status update")
  const { id } = req.body
  try {
    const order = await Order.findById(id);
    console.log(" >>>> ", req.body)
    console.log("Order>>", order)
    if (order) {
      order.isProcessed = true;
      await order.save();

      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById, // Export the new function
  updateOrderStatus,
};
