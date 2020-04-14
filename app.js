/*const express = require('express');
const app = express();
app.get('/makers/:nombre', (req, res) => {
  let name = req.params.nombre;
  name = name[0].toUpperCase() + name.slice(1);
  (name) ? (res.send('<h1>Hola '+name+'!</h1>')) :(res.send('<h1>Hola desconocido!</h1>'));
});
app.listen(3000, () => console.log('Listening on port 3000!'));*/
const express = require('express');
const app = express();
app.get('/', (req, res) => {
  var str = '';
  for(let i=1;i<=50;i++){
    i % 2 === 0 ? x =' Soy Par!' : x = ' Soy Impar!';
    str = str + '<p>'+i+x+'</>';
  }
  res.send(str);
});
app.listen(3000, () => console.log('Listening on port 3000!'));
