const express = require('express');
const userController = require('./controllers/userController.js');
const appController = require('./controllers/appController.js');
const router = express.Router();



//------------------------ USER ENDPOINT REQUESTS---------------------------

//post request for creating new user in database
//if true, will redirect to profile page
//if false, will send 'Account creation failed'
router.post('/user/register', userController.newUser, (req, res) => {
  console.log('in register user in router');
  //will need to change following line, once authenticated, user will be redirected to user home page
  res.status(200).json(res.locals);
});

//post request for logging in
//if true, will redirect to profile page
//if false, will send 'Login credentials are invalid'
router.post('/user/login', userController.login, (req, res) => {
  console.log('in login in router');
  //will need to change following line, once authenticated user will be redirected to user home page
  res.status(200).json(res.locals);
});

// //get request for fetching landingPage
// router.get('/user/landingPage', /*middleware to handle login*/ (req, res) => {
//   console.log('in profile in router');
//   //next line needs to be changes, will return status 200 once profile page successfully fetched and serve profile page
//   res.status(200).send('in landing page');
// });

// //delete user request 
// router.delete('/user/delete:id', /*middleware to handle delete app*/ (req, res) => {
//     console.log('in delete app in router');
//     //should return status 200 after successfully deleting user from database -- will need ID to delete it
//     res.sendStatus(200);
// });

//------------------------ APP ENDPOINT REQUESTS---------------------------

//post request for creating new application
router.post('/app/new', appController.newApp, (req, res) => {
  console.log('in new app in router');
  //should return status 200 after successful post request to database
  res.sendStatus(200);
});

// //delete app request
// router.delete('/app/delete:id', /*middleware to handle delete app*/ (req, res) => {
//     console.log('in delete app in router');
//     //should return status 200 after successfully deleting app from database -- will need ID to delete it
//     res.sendStatus(200);
// });

// //update app request
// router.patch('/app/update', /*middleware to handle delete app*/ (req, res) => {
//   console.log('in update in router');
//   //should return status 200 after successfully updating app in database
//   res.sendStatus(200);
// });

module.exports = router; 