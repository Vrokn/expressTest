const express = require('express');
const app = express();
app.get('/', (req, res) => {
  let name = req.query.nombre;
  name[0].toUpperCase();
  (name) ? (res.send('<h1>Hola '+name+'!</h1>')) :(res.send('<h1>Hola desconocido!</h1>'));
});
app.listen(3000, () => console.log('Listening on port 3000!'));
