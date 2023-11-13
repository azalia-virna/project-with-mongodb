const express = require("express");
const route = express.Router();

const {
  getAllUser,
  getUserById,
  createUser,
  getUserTodos,
  editUserById,
  deleteUserById
} = require("../controllers/user.controller");
const verifyToken = require("../middleware/auth");

route.get("/", getAllUser);
route.get("/:id", verifyToken, getUserById);
route.get("/:id/todos", verifyToken ,getUserTodos);
route.post("/", createUser);
route.put('/:id', editUserById);
route.delete('/:id', deleteUserById);

module.exports = route;
