const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
},
    customer: {
      name: {
        type: String,
        required: true
      },

      email: {
        type: String,
        required: true
      },

      address: {
        type: String,
        required: true
      },

      city: {
        type: String,
        required: true
      },

      pincode: {
        type: String,
        required: true
      },
    },

    items: [
      {
        productId: {
          type: Number,
          required: true
        },

        title: {
          type: String,
          required: true
        },

        price: {
          type: Number,
          required: true
        },

        quantity: {
          type: Number,
          required: true
        }
      }
    ],

    total: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Order", orderSchema);