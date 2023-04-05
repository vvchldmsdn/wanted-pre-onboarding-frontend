import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

function TodoPage() {
  const navigate = useNavigate();

  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);

  const handleNewtodoChange = (e) => {
    const todo = e.target.value;
    setNewTodo(todo);
  }

  const handleSetTodos = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin')
    }
  }, [navigate])

  useEffect(() => {
    const getTodo = JSON.parse(localStorage.getItem('todos'));
    if (getTodo) {
      setTodos(getTodo);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);


  return (
    <div>
      <input data-testid="new-todo-input"
        value={newTodo}
        onChange={handleNewtodoChange}
      />
      <button data-testid="new-todo-add-button"
        onClick={handleSetTodos}
      >추가</button>
      {todos.map((todo, index) => (
        <label key={index}>
          <input type="checkbox"/>
          <span>{todo}</span>
        </label>
      ))}
    </div>
  );
}

export default TodoPage;