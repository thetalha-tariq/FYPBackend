const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");

// Route to create a new product
router.post("/create", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(200).send({ message: "Product created successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error creating product", success: false, error });
  }
});

// Route to get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send({ products, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching products", success: false, error });
  }
});

// Route to get a single product by ID
router.get("/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found", success: false });
    }
    res.status(200).send({ product, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching product", success: false, error });
  }
});

// Route to update a product
router.put("/:productId", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).send({ message: "Product not found", success: false });
    }
    res.status(200).send({ message: "Product updated successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error updating product", success: false, error });
  }
});

// Route to delete a product
router.delete("/:productId", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
    if (!deletedProduct) {
      return res.status(404).send({ message: "Product not found", success: false });
    }
    res.status(200).send({ message: "Product deleted successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error deleting product", success: false, error });
  }
});

module.exports = router;
