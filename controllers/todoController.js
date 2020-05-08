const AppError = require("../helpers/appError");
const catchAsync = require("../helpers/catchAsync");
const Todo = require("../models/todoModel");

exports.getAllTodos = catchAsync(async (req, res, next) => {
  const todos = await Todo.find();

  res.status(200).json({
    status: "success",
    length: todos.length,
    todos
  });
});

exports.createTodo = catchAsync(async (req, res, next) => {
  const todo = await Todo.create(req.body);

  res.status(201).json({
    status: "success",
    todo
  });
});

exports.getOneTodo = catchAsync(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) return next(new AppError("No document found with that ID", 404));

  res.status(200).json({
    status: "success",
    todo
  });
});

exports.deleteOneTodo = catchAsync(async (req, res, next) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);

  if (!todo) return next(new AppError("No document found with that ID", 404));

  res.status(204).json({
    status: "success",
    data: null
  });
});

exports.updateOneTodo = catchAsync(async (req, res, next) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!updatedTodo)
    return next(new AppError("No document found with that ID", 404));

  res.status(201).json({
    status: "success",
    updatedTodo
  });
});
