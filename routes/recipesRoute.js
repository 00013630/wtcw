// routes/recipeRouter.js
const express = require('express');
const recipeController = require('../controllers/recipeController');

const router = express.Router();

// Get all recipes
router.get('/', recipeController.getAllRecipes);

// Get recipe by ID
router.get('/:id', recipeController.getRecipeById);

// Create a new recipe
router.post('/', recipeController.createRecipe);

// Update a recipe
router.put('/:id', recipeController.updateRecipe);

// Delete a recipe
router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;
