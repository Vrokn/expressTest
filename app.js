const express = require('express');
const app = express();
app.get('/makers', (req, res) => {
  let name = req.query.nombre;
  name = name[0].toUpperCase() + name.slice(1);
  (name) ? (res.send('<h1>Hola '+name+'!</h1>')) :(res.send('<h1>Hola desconocido!</h1>'));
});
app.listen(3000, () => console.log('Listening on port 3000!'));
