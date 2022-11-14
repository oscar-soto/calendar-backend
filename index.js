const express = require('express');
require('dotenv').config();

// Build a Express Server
const app = express();

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
