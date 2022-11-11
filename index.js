const express = require('express');

// Crear el servidor de express
const app = express();

// Rutas
app.get('/', (req, res) => {
  res.json({
    ok: true,
  });
});

// Ecuchar peticiones
app.listen(4000, () => {
  console.log(`servior corriendo en puerto ${4000}`);
});
