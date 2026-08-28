const Cart = require("../models/Cart");

// Get cart
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({
      userId: req.user.userId
    });

    if (!cart) {
      cart = await Cart.create({
        userId: req.user.userId,
        items: []
      });
    }

    res.json(cart);
  } catch (error) {
    console.error("Get cart error:", error);

    res.status(500).json({
      message: "Failed to fetch cart"
    });
  }
};

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const {
      productId,
      title,
      price,
      quantity,
      thumbnail
    } = req.body;

    if (!productId || !title || price === undefined || !quantity) {
      return res.status(400).json({
        message: "Product details are required"
      });
    }

    let cart = await Cart.findOne({
      userId: req.user.userId
    });

    if (!cart) {
      cart = await Cart.create({
        userId: req.user.userId,
        items: [
          {
            productId,
            title,
            price,
            quantity,
            thumbnail
          }
        ]
      });

      return res.status(201).json(cart);
    }

    const existingItem = cart.items.find(
      (item) => item.productId === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId,
        title,
        price,
        quantity,
        thumbnail
      });
    }

    await cart.save();

    res.status(201).json(cart);
  } catch (error) {
    console.error("Add to cart error:", error);

    res.status(500).json({
      message: "Failed to add item to cart"
    });
  }
};
// Update cart item quantity
const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1"
      });
    }

    const cart = await Cart.findOne({
  userId: req.user.userId
});

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    const item = cart.items.id(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Cart item not found"
      });
    }

    item.quantity = quantity;

    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error("Update cart error:", error);

    res.status(500).json({
      message: "Failed to update cart"
    });
  }
};
const deleteCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({
  userId: req.user.userId
});

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    const item = cart.items.id(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Cart item not found"
      });
    }

    item.deleteOne();

    await cart.save();

    res.json({
      message: "Cart item removed successfully",
      cart
    });
  } catch (error) {
    console.error("Delete cart item error:", error);

    res.status(500).json({
      message: "Failed to remove cart item"
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  deleteCartItem
};