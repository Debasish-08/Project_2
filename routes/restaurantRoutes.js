const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');

// Route to get all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to create a new restaurant
router.post('/', async (req, res) => {
  const restaurant = new Restaurant(req.body);
  try {
    const newRestaurant = await restaurant.save();
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to get a specific restaurant by ID
router.get('/:id', getRestaurant, (req, res) => {
  res.json(res.restaurant);
});

// Route to update a specific restaurant by ID
router.patch('/:id', getRestaurant, async (req, res) => {
  if (req.body.name != null) {
    res.restaurant.name = req.body.name;
  }
  if (req.body.location != null) {
    res.restaurant.location = req.body.location;
  }
  // Add other fields to update as needed
  try {
    const updatedRestaurant = await res.restaurant.save();
    res.json(updatedRestaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to delete a specific restaurant by ID
router.delete('/:id', getRestaurant, async (req, res) => {
  try {
    await res.restaurant.remove();
    res.json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware function to get a restaurant by ID
async function getRestaurant(req, res, next) {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (restaurant == null) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.restaurant = restaurant;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;
