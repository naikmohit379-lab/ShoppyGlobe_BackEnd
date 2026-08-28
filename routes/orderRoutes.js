const express = require("express");

const {
  createOrder
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create order
router.post("/", authMiddleware, createOrder);

module.exports = router;