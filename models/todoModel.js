const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  children: {
    type: [Object],
    required: true
  }
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
