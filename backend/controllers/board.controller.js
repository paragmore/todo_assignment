const Board = require("../models/board.model.js");
exports.create = (req, res) => {
  // Validate request
  console.log(req.body.boardName)
  if (!req.body.boardName) {
    return res.status(400).json({
      message: "Fields can not be empty",
    });
  }

  const board = new Board({
    boardName: req.body.boardName,
    priorityIndex: req.body?.priorityIndex,
  });

  board
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while adding the board.",
      });
    });
};

exports.getBoards = (req, res) => {
  Board.find()
    .then((boards) => {
      res.send(boards);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving boards.",
      });
    });
};

exports.getBoard = (req, res) => {
  if (!req.boardId) {
    return res.json({ message: "Please provide board Id" });
  }
  Board.find({ _id: boardId })
    .then((board) => {
      res.send(board);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving board.",
      });
    });
};
