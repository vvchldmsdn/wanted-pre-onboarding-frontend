import React from "react";

function SignIn() {
  return (
    <div className='signup'>
      <div className='email-signup'>
        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping">@</span>
          <input data-testid="email-input" type="text" class="form-control" placeholder="email" aria-describedby="addon-wrapping"
          />
        </div>
      </div>
      <div className='password-signup'>
        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping">PW</span>
          <input data-testid="password-input" type="text" class="form-control" placeholder="password" aria-describedby="addon-wrapping"
           />
        </div>
      </div>
      <div className='button-signup'>
        <button type="button" class="btn btn-outline-dark">Login</button>
      </div>
    </div>
  );
}

export default SignIn