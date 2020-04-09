const express = require('express');
const app = express();
var name = "desconocido";
app.get('/', (req, res) => {
  name = req.query.name;
  res.send("Hola "+name+'!');
});
app.listen(3000, () => console.log('Listening on port 3000!'));
