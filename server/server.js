const path = require('path');
const express = require('express');
const PORT = 3000; 
const app = express();

// allows us to use .env files across server 
require('dotenv').config();

app.use(express.json());

// app.use(express.static(path.resolve(__dirname, '../build')));
app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, '../client/index.html'));
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})