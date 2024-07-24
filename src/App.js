import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './components/ToDoList';
import AddTodo from './components/AddToDo';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:5000/todos');
    setTodos(response.data);
  };

  const addTodo = async text => {
    const response = await axios.post('http://localhost:5000/todos', { text });
    setTodos([...todos, response.data]);
  };

  const deleteTodo = async id => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div>
      <h1>Todo App</h1>
      <AddTodo addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} />
    </div>
  );
};

export default App;
