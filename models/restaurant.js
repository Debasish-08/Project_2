const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: String,
  // Add other fields as needed
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
