import { React, useState, useEffect } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function TodoList({ todoList, index }) {
  const [todos, setTodos] = useState([{}]);

  const onDragEnd = ({ source, destination, type }) => {
    // dropped outside the allowed zones
    if (!destination) return;

    // Move list
    if (type === "COLUMN") {
      // Prevent update if nothing has changed
      if (source.index !== destination.index) {
        console.log(source.index, destination.index);
      }
      return;
    }
  };

  useEffect(() => {
    if (todoList != undefined) {
      getTodo(todoList._id);
    }
  }, [todoList]);

  const addTodo = (text) => {
    fetch("/api/todo/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        todoList: todoList._id,
        priorityIndex: todos.length,
      }),
    })
      .then((res) => res.json()) // or res.json()
      .then((res) => {
        console.log(res);
        const newTodos = [...todos, res];
        setTodos(newTodos);
      });
  };

  const getTodo = (id) => {
    fetch(`/api/todo/${id}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setTodos(json);
      });
  };

  const toggleCompleteTodo = (todo) => {
    var status;
    if (todo.status === "P") {
      status = "C";
    } else {
      status = "P";
    }
    fetch("/api/todo/" + todo._id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json()) // or res.json()
      .then((res) => {
        console.log(res);
        const newTodos = [...todos];
        newTodos[todo.priorityIndex].status = status;
        setTodos(newTodos);
        console.log(todos);
      });
  };

  const updateTodo = (todo, text) => {
    fetch("/api/todo/" + todo._id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    })
      .then((res) => res.json()) // or res.json()
      .then((res) => {
        console.log(res);
        const newTodos = [...todos];
        newTodos[todo.priorityIndex].text = text;
        setTodos(newTodos);
        console.log(todos);
      });
  };

  const removeTodo = (todo) => {
    fetch("/api/todo/" + todo._id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json()) // or res.json()
      .then((res) => {
        console.log(res);
        const newTodos = [...todos];
        newTodos.splice(todo.priorityIndex, 1);
        setTodos(newTodos);
        console.log(todos);
      });
  };

  return (
    <div class="p-2 p-3 mr-0 col-md-3 list mt-5">
      <Droppable droppableId={todoList._id}>
        {(provided, _snapshot) => (
          <div ref={provided.innerRef}>
            <div class="list-name-div mb-3">{todoList.todoListName}</div>

            <TodoForm todoList={todoList} addTodo={addTodo} />
            {todos &&
              todos.map((todo, index) => (
                <Todo
                  key={index}
                  index={index}
                  todo={todo}
                  completeTodo={toggleCompleteTodo}
                  removeTodo={removeTodo}
                  updateTodo={updateTodo}
                />
              ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default TodoList;
