// controllers/recipeController.js
const recipeService = require('../services/recipeService');

async function getAllRecipes(req, res, next) {
    try {
        const recipes = await recipeService.getAllRecipes();
        res.json(recipes);
    } catch (error) {
        next(error);
    }
}

async function getRecipeById(req, res, next) {
    try {
        const recipeId = req.params.id;
        const recipe = await recipeService.getRecipeById(recipeId);
        res.json(recipe);
    } catch (error) {
        next(error);
    }
}

async function createRecipe(req, res, next) {
    try {
        const newRecipe = req.body;
        const createdRecipe = await recipeService.createRecipe(newRecipe);
        res.status(201).json(createdRecipe);
    } catch (error) {
        next(error);
    }
}

async function updateRecipe(req, res, next) {
    try {
        const recipeId = req.params.id;
        const updatedRecipe = req.body;
        const recipe = await recipeService.updateRecipe(recipeId, updatedRecipe);
        res.json(recipe);
    } catch (error) {
        next(error);
    }
}

async function deleteRecipe(req, res, next) {
    try {
        const recipeId = req.params.id;
        await recipeService.deleteRecipe(recipeId);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe
};
