import React from "react";

function TodoForm({ addTodo, todoList }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <div class="row m-1 mb-4">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          class="input col-12"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={'+ Add task to "' + todoList.todoListName + '"'}
        />
      </form>
    </div>
  );
}

export default TodoForm;
