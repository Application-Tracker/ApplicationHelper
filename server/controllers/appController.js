const db = require('../models/appModel.js');
const appController = {};

appController.newApp = (req, res, next) => {
  // if (!res.locals.authStatus || !res.locals.authStatus.userId || !res.local.authStatus.isAuthenticated) {
  //   return next({ message: {err: 'Not authenticated'}})
  // }
  const { status, dateApplied, company, position, notes, description } = req.body; 
  // const userId = res.locals.authStatus.userId;
  const userId = 1; 

  const query = 
  `INSERT INTO applications 
  (user_id, status, date_created, date_applied, company, position, notes, description)
  VALUES 
  ($1, $2, $3, to_timestamp($4), $5, $6, $7, $8)
  RETURNING *`;

  const params = [
    userId, 
    status, 
    new Date(),
    new Date(dateApplied),
    company,
    position,  
    notes, 
    description
  ];

  db.query(query, params, (err, payload) => {
    if (err) {
      console.log(err);
      return next({ message: { err: 'error occurred in newApp database query'} })
    } else {
      

      const response = payload.rows[0];
      res.locals.newAppInfo = {
        postId: response._id, 
        userId: response.user_id, // not sure if needed, 
        status: response.status, 
        dateCreated: new Date(response.date_created).toUTCString(), 
        dateApplied: new Date(response.date_applied).toUTCString(),
        company: response.company, 
        position: response.position,
        notes: response.notes, 
        description: response.description,
      }

      console.log('this is the response from new app query ', response);
      return next();
      
    }
  })
}

module.exports = appController;