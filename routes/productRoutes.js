const express = require('express');
const router = express.Router();
const productController = require('../app/api/controller/productController');

// Create a new product
router.post('/', productController.create);

// Get all products
router.get('/', productController.getAll);

// Update a product by ID
router.put('/:id', productController.update);

// Delete a product by ID
router.delete('/:id', productController.delete);

module.exports = router;
