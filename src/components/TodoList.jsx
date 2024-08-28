import { useState } from "react";

function TodoList() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleClick = () => {
    if (todo === "") return;
    if (editId) {
      const newTodoList = todoList.map((item) => {
        if (item.id === editId) {
          item.value = todo.value;
        }
        return item;
      });
      setTodoList(newTodoList);
      setEditId(0);
      setTodo("");
      return;
    }
    setTodoList([...todoList, todo]);
    setTodo("");
  };

  const handleEdit = (id) => {
    // const id = e.target.getAttribute("data-id");
    const todo = todoList.filter((todo) => todo.id === id);
    setTodo(todo[0]);
    setEditId(id);
  };

  const handleDelete = (id) => {
    const newTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(newTodoList);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add ToDo"
        value={todo ? todo.value : ""}
        onChange={(e) => setTodo({ id: Date.now(), value: e.target.value })}
      />
      <button onClick={handleClick}>{editId ? "Edit" : "Add"} ToDo</button>
      <div className="todo-list">
        {todoList.map((item) => {
          return (
            <TodoItem
              {...item}
              key={item.id}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
    </div>
  );
}

const TodoItem = ({ id, value, handleEdit, handleDelete }) => {
  return (
    <div className="item">
      <li onDoubleClick={() => handleEdit(id)}>{value}</li>
      <div className="delete" onClick={() => handleDelete(id)}>
        X
      </div>
    </div>
  );
};

export default TodoList;
