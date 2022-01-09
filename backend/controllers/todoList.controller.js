const TodoList = require("../models/todoList.model.js");
exports.create = (req, res) => {
  // Validate request
  console.log(req.body.todoListName);
  if (!req.body.board || !req.body.todoListName) {
    return res.status(400).json({
      message: "Fields can not be empty",
    });
  }

  const todoList = new TodoList({
    board: req.body.board,
    todoListName: req.body.todoListName,
    priorityIndex: req.body?.priorityIndex,
  });

  todoList
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding the todoList.",
      });
    });
};

exports.getTodoLists = (req, res) => {
  TodoList.find()
    .then((todoList) => {
      res.send(todoList);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving todoLists.",
      });
    });
};

exports.getTodoList = (req, res) => {
  if (!req.body.todoListId) {
    return res.json({ message: "Please provide todoList Id" });
  }
  TodoList.find({ _id: req.body.todoListId })
    .then((todoList) => {
      res.send(todoList);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving todoList.",
      });
    });
};

exports.getTodoListsFromBoard = (req, res) => {
  console.log(req.params);
  if (!req.params.board) {
    return res.json({ message: "Please provide board Id" });
  }
  TodoList.find({ board: req.params.board })
    .then((todoList) => {
      res.send(todoList);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving todoLists.",
      });
    });
};


