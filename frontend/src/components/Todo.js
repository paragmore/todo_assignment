import { React, useState, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";

function Todo({ todo, index, completeTodo, removeTodo, updateTodo }) {
  const [value, setValue] = useState("");
  useEffect(() => {
    setValue(todo.text);
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    updateTodo(todo, value);
  };
  return (
    <Draggable draggableId={todo._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="List"
        >
          <div className="todo">
            <div class="input row m-2">
              <form class="col-8" onSubmit={handleSubmit}>
                <input
                  class="update-input col-12"
                  style={{
                    textDecoration: todo.status === "C" ? "line-through" : "",
                  }}
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </form>
              <div class="col-4">
                <button class="btn" onClick={() => completeTodo(todo)}>
                {todo.status === "P" ?<span>&#10003;</span>:
                <span>&#10539;</span>}
                </button>
                <button class="btn" onClick={() => removeTodo(todo)}>
                <i class="fa fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Todo;
