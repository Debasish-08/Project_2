const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: String,
  items: [{ menuId: mongoose.Schema.Types.ObjectId, quantity: Number }],
  status: String, // pending, accepted, being prepared, delivered, etc.
  // Add other fields as needed
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
