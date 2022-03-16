const db = require('../models/appModel.js');
const bcrypt = require('bcrypt');


// const PG_URI = process.env.PG_URI;
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
  console.log('in userController.auth', req.body);
  //get username and password from request body -- eventually will encrpt password 
  const { username, password } = req.body;
  //validate user and password - if either are missing/invalid, send error message
  if (!username || !password) {
    return res.status(400).send('All fields are required.');
  }
  //if username and password ARE both present, make query to db
  const userQuery = `SELECT * FROM users WHERE username = $1 LIMIT 1`;
  
  //I THINK this is the right set up to use the $1 and all that
  db.query(userQuery, [username])
    .then((data) => {
      // if no user with username given exists
      if (data.rows.length === 0) {
        console.log('Login unsuccessful');
        return res.status(400).send('Invalid credentials, please try logging in again.');
      }
      //store data on res.locals.userData -- should contain username and password
      console.log('data', data);
      const user = data.rows[0];
      console.log('this is the user', user);
      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          console.log('bcrypt data', isMatch);
          if (isMatch) {
            res.locals.validUser = true;
            next();
          } else {
            res.locals.validUser = false;
            return res.status(400).send('Invalid credentials, please try logging in again.');
          }
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

module.exports = userController;


/*

 Result {
[1]   command: 'INSERT',
[1]   rowCount: 1,
[1]   oid: 0,
[1]   rows: [],
[1]   fields: [],
[1]   _parsers: undefined,
[1]   _types: TypeOverrides {
[1]     _types: {
[1]       getTypeParser: [Function: getTypeParser],
[1]       setTypeParser: [Function: setTypeParser],
[1]       arrayParser: [Object],
[1]       builtins: [Object]
[1]     },
[1]     text: {},
[1]     binary: {}
[1]   },
[1]   RowCtor: null,
[1]   rowAsArray: false
}
*/