const Order = require("../models/Order");
const Cart = require("../models/Cart");

const createOrder = async (req, res) => {
  try {
    const { customer, items, total } = req.body;

    if (!customer || !items || items.length === 0 || total === undefined) {
      return res.status(400).json({
        message: "Customer details, items, and total are required"
      });
    }

    const order = await Order.create({
      userId: req.user.userId,
      customer,
      items,
      total
    });

    // Clear user's cart after successful order
    await Cart.findOneAndUpdate(
      { userId: req.user.userId },
      { items: [] }
    );

    res.status(201).json({
      message: "Order placed successfully",
      order
    });

  } catch (error) {
    console.error("Create order error:", error);

    res.status(500).json({
      message: "Failed to create order"
    });
  }
};

module.exports = {
  createOrder
};