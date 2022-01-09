import { React, useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TodoList from "./TodoList";
function Board() {
  const [todoLists, setTodoLists] = useState([{}]);
  useEffect(() => {
    getTodoLists();
  }, []);
  const getTodoLists = () => {
    fetch(`/api/todolists`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setTodoLists(json);
      });
  };

  const updateTodoPriority = (sIndex, dIndex, todoList) => {
    fetch("/api/swap", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sIndex, dIndex, todoList }),
    })
      .then((res) => res.json()) // or res.json()
      .then((res) => {
        console.log(res);
      });
  };

  const onDragEnd = ({ source, destination, type }) => {
    // dropped outside the allowed zones
    if (!destination) return;
    console.log(source, destination);

    // Move list

    // Prevent update if nothing has changed
    if (source.droppableId === destination.droppableId) {
      if (source.index !== destination.index) {
        console.log(source.index, destination.index);
        updateTodoPriority(source.index, destination.index, source.droppableId)
      }
    }
    return;
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" direction="vertical" type="ROW">
        {(provided, _snapshot) => (
          <div className="Board" ref={provided.innerRef}>
            <div class="board d-flex flex-row p-2 m-2 row show-grid">
              {todoLists.map((todoList, index) => (
                <TodoList key={index} index={index} todoList={todoList} />
              ))}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
