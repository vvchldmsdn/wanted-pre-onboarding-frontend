import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function TodoPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/signin')
    }
  }, [navigate])

  return (
    <div>
      <h1>Todo!!!</h1>
    </div>
  );
}

export default TodoPage;