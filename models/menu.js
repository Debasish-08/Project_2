const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    itemName: String,
    price: Number,
    quantity: Number,
    // add other fields later
});

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;