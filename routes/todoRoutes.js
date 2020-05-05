const express = require("express");

const {
  createTodo,
  deleteOneTodo,
  getAllTodos,
  getOneTodo,
  updateOneTodo
} = require("../controllers/todoController.js");

const router = express.Router();

router
  .route("/")
  .get(getAllTodos)
  .post(createTodo);

router
  .route("/:id")
  .get(getOneTodo)
  .patch(updateOneTodo)
  .delete(deleteOneTodo);

module.exports = router;
