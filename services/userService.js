const fs = require("fs").promises;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const usersFile = "database/users.json";

async function getUsers() {
  try {
    const usersData = await fs.readFile(usersFile, "utf-8");
    return JSON.parse(usersData);
  } catch (error) {
    return [];
  }
}

async function saveUsers(users) {
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2), "utf-8");
}

async function createUser(userData) {
  const { username, password } = userData;
  const users = await getUsers();
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    throw new Error("Username already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now().toString(),
    username,
    password: hashedPassword,
  };
  users.push(newUser);
  await saveUsers(users);
  return { id: newUser.id, username: newUser.username };
}

async function login(username, password) {
  const users = await getUsers();
  const user = users.find((user) => user.username === username);
  if (!user) {
    throw new Error("User not found");
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error("Invalid password");
  }
  const token = jwt.sign({ userId: user.id }, "secret", { expiresIn: "110h" });
  return { token, user_id: user.id };
}

module.exports = { createUser, login };
