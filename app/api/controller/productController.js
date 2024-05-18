const Product = require("../models/productModel")
const jwt = require("jsonwebtoken")

module.exports = {
    create: async (req, res, next) => {
        try {
            const newProduct = new Product(req.body);
            await newProduct.save();
            res.status(200).send({ message: "Product created successfully", success: true });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error creating product", success: false, error });
        }
    },
    getAll: async (req, res, next) => {
        try {
            const products = await Product.find();
            res.status(200).send({ products, success: true });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error fetching products", success: false, error });
        }
    },
    getbyId: async (req, res, next) => {
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
    },
    updateProduct: async (req, res, next) => {
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
    },
    deleteProduct: async (req, res, next) => {
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
    }

}