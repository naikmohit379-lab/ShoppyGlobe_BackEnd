const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  stock: {
    type: Number,
    required: true
  },
  rating: {
  type: Number,
  required: true
},

  category: {
    type: String,
    required: true
  },

  thumbnail: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Product", productSchema);