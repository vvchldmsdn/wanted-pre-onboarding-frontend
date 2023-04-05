import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './signup.css';

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  const handleLoginButtonClick = () => {
    console.log('email', email)
    console.log('password', password)

    const data = {
      email: email,
      password: password
    };
    const url = 'https://www.pre-onboarding-selection-task.shop/auth/signin'

    axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status === 200) {
          const token = res.data.access_token;
          localStorage.setItem('token', token);
          navigate('/todo')
        }
        console.log(res)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className='signup'>
      <div className='email-signup'>
        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping">@</span>
          <input data-testid="email-input" type="text" class="form-control" placeholder="email" aria-describedby="addon-wrapping"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
      </div>
      <div className='password-signup'>
        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping">PW</span>
          <input data-testid="password-input" type="text" class="form-control" placeholder="password" aria-describedby="addon-wrapping"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
      </div>
      <div className='button-signup'>
        <button type="button" class="btn btn-outline-dark"
          onClick={handleLoginButtonClick}
        >Login</button>
      </div>
    </div>
  );
}

export default SignIn