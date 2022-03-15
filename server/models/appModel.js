const { Pool, Client } = require('pg');

const URI = process.env.PG_URI;

const pool = new Pool({
  connectionString: URI,
});

//Hey Nick! I wasn't sure about this next bit so I'm justing leaving this here commented out -- I need to do some research
// const client = new Client({
//   connectionString: PG_URI
// });

// client.connect();


//export object that contains query property -- is a function that returns invocation of pool.query() after logging query
//provides access point to database
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};