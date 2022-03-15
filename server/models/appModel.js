const { Pool, Client } = require('pg');

const URI = process.env.PG_URI;

const pool = new Pool({
  connectionString: URI,
});