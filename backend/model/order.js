const mongoose = require("mongoose");

const orderschema = new mongoose.Schema({
  email: String,
  firstname: String,
  lastname: String,
  address: String,
  apartment: String,
  country: String,
  city: String,
  state: String,
  pincode: String,
  phone: Number,
  cartTotalQuantity: Number,
  cartTotalAmount: Number,
  userdetail: String,
  cartdata: Array,
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  packed: { type: Boolean, default: false }
});

const order = mongoose.model("orders", orderschema);
order.createIndexes();

module.exports = order;
