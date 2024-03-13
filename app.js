const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const isAuthenticated = require("./middlewares/isAuthenticated");
const recipeRouter = require("./routes/recipesRoute");
const usersRouter = require("./routes/usersRoute");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "pug");

app.use(express.json());
app.use(express.static("public/"));

app.use("/recipes", recipeRouter);
app.use("/users", usersRouter);

app.get("/register", (req, res) => {
  res.render("auth/register", { loginLink: '<a href="/login">Log in</a>' });
});

app.get("/login", (req, res) => {
  res.render("auth/login", { signupLink: '<a href="/signup">Sign up</a>' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
