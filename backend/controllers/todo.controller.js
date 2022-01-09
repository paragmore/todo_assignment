const Todo = require("../models/todo.model.js");
exports.create = (req, res) => {
  // Validate request
  console.log(req.body);
  if (!req.body.text || !req.body.todoList) {
    return res.status(400).json({
      message: "Fields can not be empty",
    });
  }

  const todo = new Todo({
    text: req.body.text,
    status: req.body.status,
    priorityIndex: req.body?.priorityIndex,
    todoList: req.body.todoList,
  });

  todo
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while adding the todo.",
      });
    });
};

exports.getTodosFromList = (req, res) => {
  console.log(req.params);
  if (!req.params.todoList) {
    return res.json({ message: "Please provide todoListId" });
  }
  Todo.find({ todoList: req.params.todoList })
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

exports.getTodos = (req, res) => {
  Todo.find({})
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

exports.updatetodo = (req, res) => {
  console.log(req.body);
  if (!req.params.todo) {
    return res.json({ message: "Please provide todoId" });
  }
  const { text, status } = req.body;
  var _id = req.params.todo;
  Todo.findOneAndUpdate({ _id }, { text, status })
    .then((todo) => {
      res.send(todo);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while saving todo.",
      });
    });
};

exports.removeTodo = (req, res) => {
  console.log(req.params);
  if (!req.params.todo) {
    return res.json({ message: "Please provide todo Id" });
  }
  Todo.findOneAndRemove(req.params.todo)
    .then((todo) => {
      res.send(todo);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving todoLists.",
      });
    });
};

exports.updatePriority = (req, res) => {
  console.log(req.body);
  if (!req.body.sIndex || !req.body.dIndex || !req.body.todoList) {
    return res.json({ message: "Please provide source and dest todoIds" });
  }
  const { sIndex, dIndex, todoList } = req.body;

  Todo.find()
    .then((todos) => {
      todos.forEach((todo) => {
        console.log(todo)
        if (todo.priorityIndex === sIndex) {
          return todo.updateOne(
            { todoList: todoList, priorityIndex: sIndex },
            { $set: { priorityIndex: dIndex } }
          );
        } else if (todo.date === dIndex) {
          return todo.updateOne(
            { todoList: todoList, priorityIndex: dIndex },
            { $set: { priorityIndex: sIndex } }
          );
        } else {
          return todo;
        }
      });
    })
    .then((todo) => {
      console.log(todo)
      res.send(todo);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while saving todo.",
      });
    });
};
