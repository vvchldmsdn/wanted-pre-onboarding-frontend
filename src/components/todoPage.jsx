import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
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
      // setTodos([...todos, newTodo]);

      // const data = {
      //   todo: newTodo
      // };
      // const url = 'https://www.pre-onboarding-selection-task.shop/todos'

      // axios.post(url, data, {
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // })
      //   .then(res => {

      //   })
  
      // setNewTodo('');
      const token = localStorage.getItem('token');
      const data = {
        todo: newTodo
      };
      const url = 'https://www.pre-onboarding-selection-task.shop/todos'

      axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          const todoId = res.data.id
          const tmpTodo = res.data.todo
          const isCompleted = res.data.isCompleted

          const newTodoInfo = {
            id: todoId,
            todo: tmpTodo,
            isCompleted: isCompleted
          }

          setTodos([...todos, newTodoInfo])
          setNewTodo('')
        })
    }
  }

  const handleDeleteClick = (idx) => {
    const tmpTodos = todos.slice();
    tmpTodos.splice(idx, 1);
    setTodos(tmpTodos);
  }

  const handleCheckboxClick = (idx) => {
    const tmpTodos = todos.slice();
    const tmpIsCompleted = tmpTodos[idx].isCompleted
    tmpTodos[idx].isCompleted = !tmpIsCompleted
    setTodos(tmpTodos)
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
              <input type="checkbox" checked={todo.isCompleted} onChange={() => handleCheckboxClick(index)}/>
              <span className='todo-span'>{todo.todo}</span>
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