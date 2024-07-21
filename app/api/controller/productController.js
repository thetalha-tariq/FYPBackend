const Product = require('../models/productModel');

module.exports = {
  create: async (req, res, next) => {
    try {
      console.log("Received create product request:", req.body);
      const newProduct = new Product(req.body);

      await newProduct.save();
      res
        .status(200)
        .send({ message: "Product Created Successfully", success: true, product: newProduct });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "Error Creating Product", success: false, error });
    }
  },

  getAll: async (req, res, next) => {
    try {
      console.log("Received get all products request");
      const products = await Product.find();

      if (!products || products.length === 0) {
        return res
          .status(404)
          .send({ message: "No Products Found", success: false });
      }

      res
        .status(200)
        .send({ message: "Products Retrieved Successfully", success: true, products });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "Error Retrieving Products", success: false, error });
    }
  },

  update: async (req, res, next) => {
    try {
      console.log("Received update product request:", req.body);
      const productId = req.params.id;
      const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });

      if (!updatedProduct) {
        return res
          .status(404)
          .send({ message: "Product Not Found", success: false });
      }

      res
        .status(200)
        .send({ message: "Product Updated Successfully", success: true, product: updatedProduct });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "Error Updating Product", success: false, error });
    }
  },

  delete: async (req, res, next) => {
    try {
      console.log("Received delete product request:", req.params);
      const productId = req.params.id;
      const deletedProduct = await Product.findByIdAndDelete(productId);

      if (!deletedProduct) {
        return res
          .status(404)
          .send({ message: "Product Not Found", success: false });
      }

      res
        .status(200)
        .send({ message: "Product Deleted Successfully", success: true, product: deletedProduct });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "Error Deleting Product", success: false, error });
    }
  }
};
