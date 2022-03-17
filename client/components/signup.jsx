import React, { useState } from 'react';
import * as actions from '../actions/actions.js';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const mapStateToProps = (state) => ({
  username: state.textField.username,
  password: state.textField.password,
  validUser: state.textField.validUser,
});

const mapDispatchToProps = (dispatch) => ({
  createAccountAction: () => dispatch(actions.createAccountAction(e)),
});

  const Signup = (props) => {

    const navigate = useNavigate();
    
    // -------- HOW TO USE USE STATE ---------
    // username = label of the variable
    // setUsername is the function that changes the username state
    // the value passed in to useState is the initialized value for username 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    // handles all functionality of signup when the form is submitted
    const handleSignup = (e) => {
      // prevents reload of page 
      e.preventDefault();

      // error handling
      if (!password || !username) {
        setErrorMessage('Password or username is missing');
      }

      // if(props.validUser) props.toLandingPageAction();
      // else props.createAccountAction();

      const url = `/api/user/register`;
      const options = {
        method: 'POST',
        headers: { 'Access-Control-Allow-Origin': ' * ', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      };
      fetch(url, options)
        .then(res => {
          // bad request, did not create a new user 
          if (res.status === 400) {
            setErrorMessage('user already exists');
          }
          // good request, user was created 
          if (res.status === 200) {
            navigate('/');
          }
        })
        // .then(data => { 
          // not sure what to do with data 
          // console.log(data)
          // if (data.valid) props.toLandingPageAction();
          // else props.createAccountAction();
        // })
        .catch(e => {
          console.log(e);
        });
    }
    

    return (
      <>
      <div className ="signup">
      <header>
          <h1>Application Helper</h1>
          <p>Create an account and get started today!</p>
        </header>

          <form onSubmit = {(e) => handleSignup(e)}>
              <label htmlFor = "user"></label><br/>
              <input className = "input-box" 
              type = "text" 
              id = "user" 
              name = "user" 
              placeholder = "Create username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              />
              
              <input 
                className="input-box"
                type="password"
                id="password"
                name="password"
                placeholder="Create password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
             <input type="submit" value="Create Account" />
          </form>
          {
            // alternative 
            // errorMessage !== '' && <div>{errorMessage}</div>
            errorMessage !== '' ? <div>{errorMessage}</div> : null
            // renders the div if truthy, otherwise renders nothing
          }
        <button onClick={() => { navigate('/')}}>Already have an account?</button>
      </div>
  </>
    )
  }


export default connect(mapStateToProps, mapDispatchToProps)(Signup);