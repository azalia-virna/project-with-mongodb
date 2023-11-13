const express = require("express");
const route = express.Router();

const {
  getAllTodo,
  getTodoById,
  createTodo,
  deleteTodoById,
} = require("../controllers/todo.controller");
const verifyToken = require("../middleware/auth");

route.get("/", verifyToken, getAllTodo);
route.get("/:id", getTodoById);
route.post("/", createTodo);
route.put('/:id', getTodoById);
route.delete('/:id', deleteTodoById);

module.exports = route;
