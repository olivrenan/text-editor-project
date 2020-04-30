const Todo = require("../models/todoModel");

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();

    res.status(200).json({
      status: "success",
      length: todos.length,
      todos
    });
  } catch (error) {
    console.log(error);
  }
};

exports.createTodo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);

    res.status(201).json({
      status: "success",
      todo
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getOneTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    res.status(200).json({
      status: "success",
      todo
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "Invalid Todo ID"
    });
  }
};
