require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./DB/config');

// Build a Express Server
const app = express();

// DB
dbConnection()

// public folder
app.use(express.static('public'));

// Read and perser Body
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
// TODO: CRUD: Eventos

// listen request
app.listen(process.env.PORT, () => {
  console.log(`servior corriendo en puerto ${process.env.PORT}`);
});
