import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as actions from '../actions/actions.js';
import { connect } from 'react-redux';


const mapStateToProps = (state) => ({
  username: state.textField.username,
  password: state.textField.password,
  validUser: state.textField.validUser,
  isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  toLandingPageAction: (e) => dispatch(actions.toLandingPageAction(e)),
  authenticateUserAction: (e) => dispatch(actions.authenticateUserAction(e)),
});


const Login = (props) => {


  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  if (props.isAuthenticated) {
    alert("redirecting to main page");
    navigate('/user'); 
  }

  const handleLogin = (e) => {
    e.preventDefault();

    if (!password || !username) {
        setErrorMessage('Password or username is missing');
    };

    const url = `/api/user/login`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': ' * ',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => {
        //bad request -- either username or password incorrect
        if (res.status === 400) {
          setErrorMessage('Invalid credentials, please try logging in again.');
        }
        //username and password correct, sucessful login
        if (res.status === 200) {
          props.authenticateUserAction();
          navigate('/applications');
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <>
      <div className='login'>Login
        <form onSubmit={(e) => handleLogin(e)}>
          <input className='usernameInput'
          type = 'text'
          id = 'username'
          name = 'username'
          placeholder = 'Username'
          onChange = {(e) => {
            setUsername(e.target.value);
          }}
          />

          <input className='passwordInput'
          type = 'password'
          id = 'password'
          name = 'password'
          placeholder = 'Password'
          onChange = {(e) => {
            setPassword(e.target.value);
          }}
          />

          <input type = 'submit' value = 'Login'/>
        </form>
        {
          errorMessage !== '' && <div>{errorMessage}.</div>
        }
      <button onClick={() => { navigate('/signup')}}>Don't have an account?</button>
    </div>
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);