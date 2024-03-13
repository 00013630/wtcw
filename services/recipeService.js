const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");

const recipesFile = "database/recipes.json";

async function getAllRecipes() {
  const recipesData = await fs.readFile(recipesFile, "utf-8");
  return JSON.parse(recipesData);
}

async function getRecipeById(id) {
  const recipesData = await fs.readFile(recipesFile, "utf-8");
  const recipes = JSON.parse(recipesData);
  const recipe = recipes.find((recipe) => recipe.id === id);
  if (!recipe) {
    throw new Error("Recipe not found");
  }
  return recipe;
}

async function createRecipe(recipeData) {
  const recipesData = await fs.readFile(recipesFile, "utf-8");
  const recipes = JSON.parse(recipesData);
  const newRecipe = { id: uuidv4(), ...recipeData };
  recipes.push(newRecipe);
  await fs.writeFile(recipesFile, JSON.stringify(recipes, null, 2), "utf-8");
  return newRecipe;
}

async function updateRecipe(id, updatedRecipeData) {
  const recipesData = await fs.readFile(recipesFile, "utf-8");
  let recipes = JSON.parse(recipesData);
  const index = recipes.findIndex((recipe) => recipe.id === id);
  if (index === -1) {
    throw new Error("Recipe not found");
  }
  recipes[index] = { ...recipes[index], ...updatedRecipeData };
  await fs.writeFile(recipesFile, JSON.stringify(recipes, null, 2), "utf-8");
  return recipes[index];
}

async function deleteRecipe(id) {
  const recipesData = await fs.readFile(recipesFile, "utf-8");
  let recipes = JSON.parse(recipesData);
  recipes = recipes.filter((recipe) => recipe.id !== id);
  await fs.writeFile(recipesFile, JSON.stringify(recipes, null, 2), "utf-8");
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
