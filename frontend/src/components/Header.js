import React from "react";

function Header() {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodoList(value);
    window.location.reload();
    setValue("");
  };

  const addTodoList = (text) => {
    fetch("/api/todolist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todoListName:text,
        board: "123456",
      }),
    })
      .then((res) => res.json()) // or res.json()
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div class="row m-1 mb-4 sticky">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          class="input col-12 "
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={'Enter the list name to add List'}
        />
      </form>
    </div>
  );
}

export default Header;
