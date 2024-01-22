const express = require('express');
const router = express.Router();
const Menu = require('../models/menu');

// Route to get all menus
router.get('/', async (req, res) => {
  try {
    const menus = await Menu.find();
    res.json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to create a new menu
router.post('/', async (req, res) => {
  const menu = new Menu(req.body);
  try {
    const newMenu = await menu.save();
    res.status(201).json(newMenu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to get a specific menu by ID
router.get('/:id', getMenu, (req, res) => {
  res.json(res.menu);
});

// Route to update a specific menu by ID
router.patch('/:id', getMenu, async (req, res) => {
  // Add fields to update as needed
  try {
    const updatedMenu = await res.menu.save();
    res.json(updatedMenu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to delete a specific menu by ID
router.delete('/:id', getMenu, async (req, res) => {
  try {
    await res.menu.remove();
    res.json({ message: 'Menu deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware function to get a menu by ID
async function getMenu(req, res, next) {
  try {
    const menu = await Menu.findById(req.params.id);
    if (menu == null) {
      return res.status(404).json({ message: 'Menu not found' });
    }
    res.menu = menu;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;
