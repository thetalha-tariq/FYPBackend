const express = require("express");
const router = express.Router();
const Product = require("../app/api/models/productModel");
const ProductController = require('../app/api/controller/productController')

// Route to create a new product
router.post("/create", ProductController.create);

// Route to get all products
router.get("/", ProductController.getAll);

// Route to get a single product by ID
router.get("/:productId", ProductController.getbyId);

// Route to update a product
router.put("/:productId", ProductController.updateProduct);


// Route to delete a product
router.delete("/:productId", ProductController.deleteProduct);

module.exports = router;
