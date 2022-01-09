const mongoose = require("mongoose");

const todoListSchema = mongoose.Schema(
  {
    todoListName: { type: String, required: true },
    priorityIndex: { type: Number, required: false},
    board:{ type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TodoList", todoListSchema);
