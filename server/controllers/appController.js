const db = require('../models/appModel.js');
const appController = {};

appController.newApp = (req, res, next) => {
  const { status, dateApplied, company, position, notes, description } = req.body; 
  const query = 
  `INSERT INTO applications 
  (userId, status, dateCreated, dateApplied, company, position, notes, description)
  VALUES 
  ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *`;

  

  const params = [
    // get user Id 
    status, 
    new Date().toUTCString(),
    Date(dateApplied).toUTCString(),
    company,
    position,  
    notes, 
    description
  ];


  db.query(query, params, (err, response) => {
    if (err) {
      return next({ message: { err: 'error occurred in newApp database query'} })
    } else {
      console.log('this is the response from new app query ', response);
      // destructure the 0th index of our response rows 
      // pass into res.locals.newAppResponse 
      return next();
      
    }
  })
  .catch(e => { return next({ message: { err: e }})})
}

module.exports = appController;