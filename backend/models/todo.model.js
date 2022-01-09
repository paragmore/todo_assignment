const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    text: { type: String, required: true },
    status: {
      type: String,
      enum: ["C", "P"],
      default: "P",
      required: true,
    },
    priorityIndex: { type: Number, required: true},
    todoList:{ type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Todo", todoSchema);
