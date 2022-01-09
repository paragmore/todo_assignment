module.exports = (app) => {
  const todo = require("../controllers/todo.controller.js");
  const board = require("../controllers/board.controller.js");
  const todoList = require("../controllers/todoList.controller.js");

  app.post("/api/todo", todo.create);
  app.delete("/api/todo/:todo", todo.removeTodo);
  app.get("/api/todos/", todo.getTodos);
  app.get("/api/todo/:todoList", todo.getTodosFromList);
  app.put("/api/todo/:todo", todo.updatetodo);
  app.post("/api/board", board.create);
  app.get("/api/boards", board.getBoards);
  app.get("/api/board", board.getBoard);
  app.post("/api/todolist", todoList.create);
  app.get("/api/todolists", todoList.getTodoLists);
  app.get("/api/todolist", todoList.getTodoList);
  app.get("/api/todolists/:board", todoList.getTodoListsFromBoard);
  app.put("/api/swap", todo.updatePriority);
};
