const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CartSchema = new Schema({
  buyerID: {
    type: String,
    required: true
  },
  sellerID: {
    type: String,
    required: true
  },
  itemID: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
});

module.exports = Cart = mongoose.model("carts", CartSchema);
