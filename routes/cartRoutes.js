const express = require("express");

const {
  getCart,
  addToCart,
  updateCartItem,
  deleteCartItem
} = require("../controllers/cartController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protected cart routes
router.get("/", authMiddleware, getCart);

router.post("/", authMiddleware, addToCart);

router.put("/:id", authMiddleware, updateCartItem);

router.delete("/:id", authMiddleware, deleteCartItem);

module.exports = router;