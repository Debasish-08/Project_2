const express = require("express");
const mongoose = require('mongoose');
const Restaurant = require('./models/restaurant');
const Menu = require('./models/menu');
const Order = require('./models/order');

const app = express();
const PORT = 3000;

app.listen(PORT, ()=> {
    console.log("server is running on http://localhost:${PORT}");
});

mongoose.connect('mongodb://localhost/foodordering', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// vertion 1.0

app.use('/restaurants', require('./routes/restaurantRoutes'));
app.use('/menus', require('./routes/menuRoutes'));
app.use('/orders', require('./routes/orderRoutes'));

// ... (remaining code)
