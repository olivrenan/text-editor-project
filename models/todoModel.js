const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  children: {
    type: [Object],
    required: true
  },
  positions: {
    type: Object
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Todo must belong to a User!"]
  }
});

todoSchema.pre(/^find/, function(next) {
  this.populate("user");

  next();
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
