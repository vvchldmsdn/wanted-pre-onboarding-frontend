import React, {useEffect, useState} from 'react';
import './signup.css'
import Toast from 'react-bootstrap/Toast';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [showToast, setShowToast] = useState(true);

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  }

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  }

  useEffect(() => {
    if (email.includes('@') && password.length >= 8) {
      setDisabled(false)
      setShowToast(false)
    } else {
      setDisabled(true)
      setShowToast(true)
    }
  }, [email, password])

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
          disabled={disabled}
        >회원가입</button>
      </div>
      <Toast className='toast-signup'
        show={showToast}
      >
        <Toast.Body>이메일은 @를 반드시 포함해야합니다. / 비밀번호는 8자리 이상이여야합니다.</Toast.Body>
      </Toast>
    </div>
  );
}

export default SignUp;