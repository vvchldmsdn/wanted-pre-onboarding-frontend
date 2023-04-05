import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './todo.css'

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

  const handleDeleteClick = (idx) => {
    const tmpTodos = todos.slice();
    tmpTodos.splice(idx, 1);
    setTodos(tmpTodos);
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
    <div className='todo-wrap'>
      <input data-testid="new-todo-input"
        value={newTodo}
        onChange={handleNewtodoChange}
      />
      <button data-testid="new-todo-add-button"
        onClick={handleSetTodos}
      >추가</button>
      <div className='todo-list'>
        {todos.map((todo, index) => (
          <div key={index}>
            <label>
              <input type="checkbox"/>
              <span className='todo-span'>{todo}</span>
            </label>
            <button data-testid="modify-button">수정</button>
            <button data-testid="delete-button"
              onClick={() => handleDeleteClick(index)}
            >삭제</button>
          </div>
        ))}
      </div>
    </div> 
  );
}

export default TodoPage;