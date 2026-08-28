const Product = require("../models/Product");

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    console.error("Get products error:", error);

    res.status(500).json({
      message: "Failed to fetch products"
    });
  }
};

// Get single product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      id: Number(req.params.id)
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json(product);
  } catch (error) {
    console.error("Get product error:", error);

    res.status(500).json({
      message: "Failed to fetch product"
    });
  }
};

// Create product
const createProduct = async (req, res) => {
  try {
    const {
      id,
      title,
      description,
      price,
      stock,
      rating,
      category,
      thumbnail
    } = req.body;

    if (
      id === undefined ||
      !title ||
      !description ||
      price === undefined ||
      stock === undefined ||
      rating === undefined ||
      !category ||
      !thumbnail
    ) {
      return res.status(400).json({
        message: "All product details are required"
      });
    }

    const existingProduct = await Product.findOne({ id });

    if (existingProduct) {
      return res.status(400).json({
        message: "Product with this ID already exists"
      });
    }

    const product = await Product.create({
      id,
      title,
      description,
      price,
      stock,
      rating,
      category,
      thumbnail
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Create product error:", error);

    res.status(500).json({
      message: "Failed to create product"
    });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      id: Number(req.params.id)
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    const {
      title,
      description,
      price,
      stock,
      rating,
      category,
      thumbnail
    } = req.body;

    if (
      title === undefined &&
      description === undefined &&
      price === undefined &&
      stock === undefined &&
      rating === undefined &&
      category === undefined &&
      thumbnail === undefined
    ) {
      return res.status(400).json({
        message: "No product details provided for update"
      });
    }

    if (title !== undefined) product.title = title;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (stock !== undefined) product.stock = stock;
    if (rating !== undefined) product.rating = rating;
    if (category !== undefined) product.category = category;
    if (thumbnail !== undefined) product.thumbnail = thumbnail;

    await product.save();

    res.json(product);
  } catch (error) {
    console.error("Update product error:", error);

    res.status(500).json({
      message: "Failed to update product"
    });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      id: Number(req.params.id)
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json({
      message: "Product deleted successfully",
      product
    });
  } catch (error) {
    console.error("Delete product error:", error);

    res.status(500).json({
      message: "Failed to delete product"
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};