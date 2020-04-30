const express = require("express");

const {
  getAllTodos,
  createTodo,
  getOneTodo
} = require("../controllers/todoController.js");

const router = express.Router();

router
  .route("/")
  .get(getAllTodos)
  .post(createTodo);

router.route("/:id").get(getOneTodo);

module.exports = router;
