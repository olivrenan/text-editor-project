const express = require("express");

const {
  createTodo,
  deleteOneTodo,
  getAllTodos,
  getOneTodo,
  updateOneTodo
} = require("../controllers/todoController.js");

const { protect } = require("../controllers/authController");

const router = express.Router();

router.use(protect);

router.route("/:userId").get(getAllTodos);

router.route("/").post(createTodo);

router
  .route("/:id")
  .get(getOneTodo)
  .patch(updateOneTodo)
  .delete(deleteOneTodo);

module.exports = router;
