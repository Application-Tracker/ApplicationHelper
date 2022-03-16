const path = require('path');
const express = require('express');
const PORT = 3000; 
const app = express();
const router = require('./router');

// allows us to use .env files across server 
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//use router for anthing to /api endpoint
app.use('/api', router);

//get index.html at root endpoint
app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, '../client/index.html'));
})

//error handling for incorrect enpoint
app.use((req, res) => {
  console.log('Error: page not found')
  res.status(400).send('Error: page not found');
});

//middleware error handling
app.use((err, req, res, next) => {
  if (!err) err = {
    log: 'Express error handler caught unknown middleware',
    message: { err: 'An unknown error occurred'},
  };
  console.log(err);
  return res.status(500).json(err);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})