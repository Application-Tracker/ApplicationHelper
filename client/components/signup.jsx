import React from 'react';
import { addUserActionCreator } from '../actions/actions';
import { connect } from 'react-redux';

const onClick = (e) => {
  e.preventDefault
  console.log(e.target[0].value)
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (e) => {
      e.preventDefault
      dispatch(addUserActionCreator(e))
    }
  }
}
  const Signup = (props) => {

   handleSignup (payload, res) {
      const url = `http://localhost:3000/gainAccess/?username=${this.props.username}`;
      const options = {
        method: 'POST',
        header: { 'Access-Control-Allow-Origin': ' * ', 'Content-Type': 'application/json' },
      };
      fetch(url, options)
        .then(res => res.json())
        .then(data => {
          if (data.valid) this.props.toProfilePageAction();
          else this.props.createAccountAction();
        });
    }
    

    return (
      <body>
      <div className ="text-center flex-center">
          <div className = "logo">
              <p>Application Helper</p>
          </div>
          <form id = "user-form" onSubmit = {(e) => props.addUser(e)}>
              <label htmlFor = "user"></label><br/>
              <input className = "input-box" type = "text" id = "user" name = "user" placeholder = "enter username"></input>
              <input className = "input-box" type = "text" id = "password" name = "password" placeholder = "enter password"></input>
              <button id = "button-signup" type = "submit">Create Account</button>
              {this.props.validUser === false ? (
            <p className="validation-msg">Username is already taken</p>
          ) : (
            <p className="hidden"></p>
          )}
          </form>
      </div>
  </body>
    )
  }


export default connect(null, mapDispatchToProps)(Signup)