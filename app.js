// server.js
const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const recipeRouter = require('./routes/recipeRouter');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/recipes', recipeRouter);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
