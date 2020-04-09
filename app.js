const express = require('express');
const app = express();
var name = "desconocido";
app.get('/', (req, res) => {
  name = req.query.nombre;
  res.send('<h1>Hola '+name+'!</h1>');
});
app.listen(3000, () => console.log('Listening on port 3000!'));
