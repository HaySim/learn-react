import React, { useState } from 'react';

function App() {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = (todo) => {
    if (todo.trim() === "") return; 

    const newTodo = {
      id: Math.random(),
      todo: todo,
    };

    // add the todo to the list
    setList([...list, newTodo]);

    // clear input box
    setInput("");
  };

  const deleteTodo = (id) => {
    // filter out todo with the id
    const newList = list.filter((todo) => todo.id !== id);
    setList(newList);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTodo(input);
    }
  };

  return (
    <div style={{display: "flex", flexDirection: "column", padding: "20px"}}>
      <h1 style={{color: "white", marginBottom: "20px"}}>TO DO LIST</h1>

      <div style={{marginBottom: "20px"}}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ padding: "5px", width: "400px" }}
        />
        <button onClick={() => addTodo(input)} style={{ padding: "5px", marginLeft: "10px"}}>Add</button>
      </div>

      <div style={{alignSelf: "center"}}>
        <ul style={{textAlign: "center", listStyleType: "disc", padding: 0}}>
          {list.map((todo) => (
            <li key={todo.id} style={{marginBottom: "10px"}}>
              <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0px", gap: "20px"}}>
                <span style={{ fontSize: "1em" }}>{todo.todo}</span>
                <button onClick={() => deleteTodo(todo.id)} style={{ fontSize: "1em", padding: "1px 5px" }}>&times;</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
