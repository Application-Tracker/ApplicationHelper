import React, { useState } from 'react';
import Navbar from './Navbar.jsx'
import { useNavigate } from 'react-router-dom';
import * as actions from '../actions/actions.js';
import { connect } from 'react-redux';

//[{
//   company: state.newApp.company ,
//   position: state.newApp.position,
//   status: state.newApp.status,
//   date_applied: state.newApp.date_applied,
//   description: state.newApp.description,
//   notes: state.newApp.notes,
// }]

const mapStateToProps = (state) => ({
  applications: state.newApp.applications,
})

const mapDispatchToProps = (dispatch) => ({
  newAppAction: (obj) => dispatch(actions.newAppAction(obj)),
})

const NewApp = (props) => {

  const [errorMessage, setErrorMessage] = useState('');

  const handleNewApp = (e) => {
    e.preventDefault();
    
    const bodyObj = {};

    bodyObj.status = e.target[2].value;
    bodyObj.dateApplied = new Date(e.target[3].value);
    bodyObj.company = e.target[0].value;
    bodyObj.position = e.target[1].value;
    bodyObj.notes = e.target[5].value;
    bodyObj.description = e.target[4].value;

    console.log(bodyObj);
    props.newAppAction(bodyObj);
    
    //make a post request to the database 
    //body will be obj containing:
    //{ status, dateApplied, company, position, notes, description } 
    const url = '/api/app/new';
    fetch(url, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': ' * ',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bodyObj,
      }),
    })
      .then((res) => {
        if (res.status === 400) {
          setErrorMessage('Could not create app.')
        };
        if (res.status === 200) {
          alert('Application created!');
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }


  return (
    <>
      <Navbar /> 
      <br />
      <div>NewApp</div> 
      <br />
      <div>
         <form onSubmit={(e) => handleNewApp(e)}>
        <input
        type='text'
        placeholder='Company'
        />

        <input
        type='text'
        placeholder='Position'
        />

        <input
        type='text'
        placeholder='Status'
        />

        <input
          type='date'
        // type='text'
        placeholder='Date applied'
        />

        
        <input
        type='text'
        placeholder='Description'
        />

        
        <input
        type='text'
        placeholder='Notes'
        />

        <input
        type='submit'
        placeholder='Submit'
        />
      </form>
      </div>
      
     
    </>
    
  )
}

export default connect(mapStateToProps, mapDispatchToProps) (NewApp);