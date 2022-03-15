const db = require('../server/models/appModel');

// const PG_URI = process.env.PG_URI;
const userController = {};

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
  const newUserQuery = `INSERT into users (username, password) VALUES ($1, $2)`;

  //I believe this is the corrected syntax for using paramterized queries
  db.query(newUserQuery, [username, password])
    //should not get data back -- should catch any errors though
    .then((err) => {
      if (err) {
        return next({
          log: 'Error in userController.newUser',
          message: { err: 'Error in userController.newUser'},
        });
      } else {
        return next();
      };
    })
}


//login controler
userController.login = (req, res, next) => {
  console.log('in userController.auth', req.body);
  //get username and password from request body -- eventually will encrpt password 
  const { username, password} = req.body;
  //validate user and password - if either are missing/invalid, send error message
  if (!username || !password) {
    return res.status(400).send('All fields are required.');
  }
  //if username and password ARE both present, make query to db
  const userQuery = `SELECT * FROM users WHERE username = $1`;
  
  //I THINK this is the right set up to use the $1 and all that
  db.query(userQuery, [username])
    .then((data) => {
      //store data on res.locals.userData -- should contain username and password
      res.locals.userData;
      //if userData.password === password and same for username, login successful
      if (res.locals.userData.username === username && res.locals.userData.password === password) {
        console.log('Login successful!');
        next();
      //if username or password not found in database, login unsuccessful
      } else {
        console.log('Login unsuccessful');
        return res.status(400).send('Invalid credentials, please try logging in again.');
      };
    })
    .catch((err) => {
      next({
        log: 'Error in userController.login',
        message: { err: 'Error in userController.login'},
      })
    });
};