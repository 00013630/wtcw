const userService = require("../services/userService");

async function createUser(userData) {
  return await userService.createUser(userData);
}

async function login(username, password) {
  return await userService.login(username, password);
}

module.exports = { createUser, login };
