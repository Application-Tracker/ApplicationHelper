const db = require('../models/appModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userController = {};

const salt = Number(process.env.SALT);


//new user controller
userController.newUser = (req, res, next) => {
  console.log('in userController.newUser', req.body);
  const { username, password } = req.body;
  // validate user and password - if either are missing/invalid, send error message
  if (!username || !password) {
    return res.status(400).send('All fields are required.');
  }

  //if data valid, insert new data into table -- will encrypt password eventuall
  //didn't include _id because I think that will be auto-generated -- I may be mistaked
  //do error handling for non-unique username
  //have res.locals.validUser = true if username NOT already in db, else false
  const newUserQuery = `INSERT into users (username, password) VALUES ($1, $2) RETURNING _id`;

  bcrypt.hash(password, salt)
    .then((hash) => {
      //I believe this is the corrected syntax for using paramterized queries
      db.query(newUserQuery, [username, hash])
        .then((data) => {
          console.log('the query for new user was successful. This is the response: ', data);
          res.locals.validUser = true;
          res.locals.userID = data.rows[0]._id;
          return next();
        })
        .catch((err) => {
          console.log('the query for new user returned an error: ', err);
          // query violates unique constraint (likely on username)
          if (Number(err.code) === 23505) {
            res.locals.validUser = false;
            return res.status(400).json(res.locals);
          } 
          return next({
            log: 'Error in userController.newUser',
            message: { err: err.error },
          });
        });
    })
};


//login controler
userController.login = (req, res, next) => {


  //get username and password from request body -- eventually will encrpt password 
  const { username, password } = req.body;
  //validate user and password - if either are missing/invalid, send error message
  if (!username || !password) {
    return res.status(400).send('All fields are required.');
  }
  
  const userQuery = `SELECT * FROM users WHERE username = $1 LIMIT 1`;
  
  db.query(userQuery, [username])
    .then((data) => {
      // if no user with username given exists
      if (data.rows.length === 0) {
        console.log('Login unsuccessful');
        return res.status(400).send('Invalid credentials, please try logging in again.');
      }
      //store data on res.locals.userData -- should contain username and password
      const user = data.rows[0];
      console.log('user', user)
      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            res.locals.validUser = true;
            res.locals.user = {
              username: user.username,
              userId: user._id
            }
            return next();
          } else {
            res.locals.validUser = false;
            return res.status(400).send('Invalid credentials, please try logging in again.');
          }
        })
        .catch(e => {
          return next({
            log: 'Error in userController.login',
            message: { err: 'Error in bcrypt login'},
          })
        });
    })
    .catch((err) => {
      console.log('this is the error from login', err);
      next({
        log: 'Error in userController.login',
        message: { err: 'Error in userController.login'},
      })
    });
};


// generates a jwt token and assigns it to a response body 
userController.generateToken = (req, res, next) => {
  const JWT_SECRET = process.env.JWT_SECRET;

  const accessToken =  jwt.sign({ 
    userId: res.locals.user.userId,
    username: res.locals.user.username
  }, JWT_SECRET, { expiresIn: '7d'}); 

  res.locals.token = accessToken;

  return next();
}


// authenticates a user based on whether a req cookie called 'jwt'
// contains valid information to 
userController.verifyToken = (req, res, next) => {

  const authStatus = {
    isAuthenticated: false, 
    userId: null
  }

  const JWT_SECRET = process.env.JWT_SECRET;
  if (!req.cookies.jwt) {
    res.status(400);
    return next({ message: { err: 'Not authenticated'}});
  }
  jwt.verify(req.cookies.jwt, JWT_SECRET, (err, decoded) => {
    if (err) { 
      return next({ message: { err: 'Error in userController verify token'}})
    }
    // decoded will be undefined if tokens do not match 
    if (decoded) {
      authStatus.isAuthenticated = true; 
      authStatus.userId = decoded.userId; 
      res.locals.authStatus = authStatus;
      res.status(200);
      return next();
    } else {
      res.status(400);
      return next({ message: { err: 'Not authenticated' }})
    }
  })
}



module.exports = userController;

