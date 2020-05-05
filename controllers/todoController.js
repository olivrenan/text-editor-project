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

    if (!todo)
      return res.status(404).json({
        status: "Invalid Todo ID"
      });

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

exports.deleteOneTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "Invalid Todo ID"
    });
  }
};

exports.updateOneTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedTodo)
      return res.status(404).json({
        status: "Invalid Todo ID"
      });

    res.status(201).json({
      status: "success",
      updatedTodo
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "Invalid Todo ID"
    });
  }
};
