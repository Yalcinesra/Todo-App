import React, { useState, useEffect } from "react";
import { BsTrashFill } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";

const TodoList = () => {
  const [todo, setTodo] = useState("");
  const [allTodo, setAll] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [showTodo, setShow] = useState(true);

  const guncelle = (e) => {
    e.preventDefault();
    const newTodo = { id: uuidv4(), task: todo, completed: false };
    setAll([...allTodo, newTodo]);
    setTodo("");
  };
  const ciftTikla = (id) => {
    const updatedTodos = allTodo.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      } else {
        return item;
      }
    });
    setAll(updatedTodos);
  };

  const sil = (id) => {
    const filteredTodos = allTodo.filter((item) => item.id !== id); 
    setAll(filteredTodos);
};


  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(allTodo));
  }, [allTodo]);

  return (
    <div>
      <form onSubmit={guncelle}>
        <div className="input-group mb-3 w-50   m-auto">
          <input
          value={todo}
            onChange={(e) => setTodo(e.target.value)}
            type="search"
            className="form-control"
            placeholder="Enter new Todo.."
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
          />
          <button
            onClick={() => setShow(showTodo)}
            type="submit"
            className="btn  btn-success"
            id="button-addon2"
          >
            Add Todo
          </button>
        </div>
      </form>
      {showTodo ? (
        <ul className="m-auto">
          {allTodo.map((item) => {
            return (
              <li
                onDoubleClick={() => ciftTikla(item.id)}
                className= {
                  item.completed ? "text-decoration-line-through d-flex justify-content-between h5 p-2 border border-2 rounded w-50 m-auto mt-4 list-unstyled "  : "d-flex justify-content-between h5 p-2 border border-2 rounded w-50 m-auto mt-4 list-unstyled"
                }
                style={{ backgroundColor: "#D1E7DD" }}
                key={item.id}
              >
                {item.task}{" "}
                <span onClick={() => sil(item.id)} style={{ color: "red" }}>
                  <BsTrashFill />
                </span>
              </li>
            );
          })}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TodoList;
