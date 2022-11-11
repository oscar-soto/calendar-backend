const express = require('express');
require('dotenv').config()

// Build a Express Server
const app = express();

// public folder
app.use(express.static('public'));

// Routers
// app.get('/', (req, res) => {
//   res.json({
//     ok: true,
//   });
// });

// listen request
app.listen(process.env.PORT, () => {
  console.log(`servior corriendo en puerto ${process.env.PORT}`);
});
