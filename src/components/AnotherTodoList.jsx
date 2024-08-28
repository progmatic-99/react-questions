import { useRef, useState } from "react";

function AnotherTodoList() {
  const [todoList, setTodoList] = useState([]);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    if (e.key === "Enter") {
      setTodoList((todos) => [
        ...todos,
        { id: Date.now(), value: e.target.value, completed: false },
      ]);
      inputRef.current.value = "";
    }
    console.log(todoList);
  };

  return (
    <div>
      <input
        ref={inputRef}
        placeholder="Add Todo"
        type="text"
        onKeyDown={handleChange}
      />
      {todoList.map((todo) => (
        <Item {...todo} key={todo.id} />
      ))}
    </div>
  );
}

const Item = ({ id, value, completed }) => {
  return <li key={id}>{value}</li>;
};

export default AnotherTodoList;
