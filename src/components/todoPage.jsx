import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './todo.css'

function TodoPage() {
  const navigate = useNavigate();

  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);
  const [isEditing, setIsEditing] = useState(-1);
  const [editingValue, setEditingValue] = useState('');

  const handleNewtodoChange = (e) => {
    const todo = e.target.value;
    setNewTodo(todo);
  };

  const handleSetTodos = () => {
    if (newTodo.trim() !== '') {
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
  };

  const handleDeleteClick = (idx, dbId) => {
    const tmpTodos = todos.slice();
    tmpTodos.splice(idx, 1);
    setTodos(tmpTodos);

    const token = localStorage.getItem('token');
    const url = `https://www.pre-onboarding-selection-task.shop/todos/${dbId}`;

    axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        console.log(res)
      })
  };

  const handleCheckboxClick = (idx, dbId) => {
    const tmpTodos = todos.slice();
    const tmpIsCompleted = tmpTodos[idx].isCompleted
    tmpTodos[idx].isCompleted = !tmpIsCompleted
    setTodos(tmpTodos)

    const token = localStorage.getItem('token');
    const url = `https://www.pre-onboarding-selection-task.shop/todos/${dbId}`;
    const data = {
      todo: tmpTodos[idx].todo,
      isCompleted: tmpTodos[idx].isCompleted
    }

    axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        console.log(res)
      })
  };

  const handleEditClick = (idx) => {
    setEditingValue(todos[idx].todo)
    setIsEditing(idx);
  };

  const handleEditSubmit = (idx, dbId) => {
    const token = localStorage.getItem('token');
    const url = `https://www.pre-onboarding-selection-task.shop/todos/${dbId}`;
    const data = {
      todo: editingValue,
      isCompleted: todos[idx].isCompleted
    }

    axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        console.log(res)
      })
    
    const tmpTodos = todos.slice();
    tmpTodos[idx].todo = editingValue;
    setTodos(tmpTodos)
    setIsEditing(-1);
  };

  // 토큰이 없으면 로그인 페이지로
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin')
    }
  }, [navigate])

  // todos가 바뀌면 localStorage업데이트
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // todo데이터 DB에서 받아오기, 한번만
  useEffect(() => {
    const token = localStorage.getItem('token');
    const url = 'https://www.pre-onboarding-selection-task.shop/todos';

    axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setTodos(res.data);
      })
  }, []);


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
            {isEditing === index ? (
              <div>
                <label>
                  <input type="checkbox" checked={todo.isCompleted} onChange={() => handleCheckboxClick(index, todo.id)}/>
                  <input
                    data-testid="modify-input"
                    type="text"
                    className='todo-edit'
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                  ></input>
                </label>
                <button 
                  data-testid="modify-button"
                  onClick={() => handleEditSubmit(index, todo.id)}  
                >제출</button>
                <button 
                  data-testid="delete-button"
                  onClick={() => setIsEditing(-1)}
                >취소</button>
              </div>
            ) : (
              <div>
                <label>
                  <input type="checkbox" checked={todo.isCompleted} onChange={() => handleCheckboxClick(index, todo.id)}/>
                  <span className='todo-span'>{todo.todo}</span>
                </label>
                <button 
                  data-testid="modify-button"
                  onClick={() => handleEditClick(index)}  
                >수정</button>
                <button data-testid="delete-button"
                  onClick={() => handleDeleteClick(index, todo.id)}
                >삭제</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div> 
  );
}

export default TodoPage;