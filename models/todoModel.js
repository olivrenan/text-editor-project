const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    children: {
      type: [Object],
      required: true
    },
    user: [{ type: mongoose.Schema.ObjectId, ref: "User" }]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
