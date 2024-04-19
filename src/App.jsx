import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState("");

  function persistData(newList) {
    localStorage.setItem("todos", JSON.stringify({ todos: newList }));
  }

  function handleAddTodos(newTodo) {
    const newTodoList = [...todos, newTodo];
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  function handleDeleteTodos(todoIndex) {
    const newTodoList = todos.filter((todo, index) => {
      return index !== todoIndex;
    });
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  function handleEditTodos(todoIndex) {
    const valueToBeEdited = todos[todoIndex];
    setTodoValue(valueToBeEdited);
    handleDeleteTodos(todoIndex);
  }

  useEffect(() => {
    if (!localStorage) return;

    let todos = localStorage.getItem("todos");
    if (!todos) {
      return;
    }
    todos = JSON.parse(todos).todos;
    setTodos(todos);
  }, []);

  return (
    <>
      <TodoInput
        todoValue={todoValue}
        setTodoValue={setTodoValue}
        handleAddTodos={handleAddTodos}
      />
      <TodoList
        handleDeleteTodos={handleDeleteTodos}
        handleEditTodos={handleEditTodos}
        todos={todos}
      />
    </>
  );
}

export default App;
