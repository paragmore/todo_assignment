const mongoose = require("mongoose");

const boardSchema = mongoose.Schema(
  {
    boardName: { type: String, required: true },
    priorityIndex: { type: Number, required: false},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Board", boardSchema);
