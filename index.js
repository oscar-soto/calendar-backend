const express = require('express');
const { dbConnection } = require('./DB/config');
const cors = require('cors')
require('dotenv').config();

// Build a Express Server
const app = express();

// DB
dbConnection()

// Cors
app.use(cors())

// public folder
app.use(express.static('public'));

// Read and perser Body
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index');
})

// listen request
app.listen(process.env.PORT, () => {
  console.log(`servior corriendo en puerto ${process.env.PORT}`);
});
