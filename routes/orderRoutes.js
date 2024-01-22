const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Route to get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to create a new order
router.post('/', async (req, res) => {
  const order = new Order(req.body);
  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to get a specific order by ID
router.get('/:id', getOrder, (req, res) => {
  res.json(res.order);
});

// Route to update a specific order by ID
router.patch('/:id', getOrder, async (req, res) => {
  // Add fields to update as needed
  try {
    const updatedOrder = await res.order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to delete a specific order by ID
router.delete('/:id', getOrder, async (req, res) => {
  try {
    await res.order.remove();
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware function to get an order by ID
async function getOrder(req, res, next) {
  try {
    const order = await Order.findById(req.params.id);
    if (order == null) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.order = order;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;
// add the id: later