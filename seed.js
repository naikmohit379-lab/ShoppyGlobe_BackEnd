const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);
require("dotenv").config();

const connectDB = require("./config/db");
const Product = require("./models/Product");
const products = require("./data/products");

const seedProducts = async () => {
  try {
    await connectDB();

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Products added successfully");

    process.exit(0);
  } catch (error) {
    console.error("Error adding products:", error.message);
    process.exit(1);
  }
};

seedProducts();