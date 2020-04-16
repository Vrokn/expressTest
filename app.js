const express = require('express');
var mongoose = require("mongoose");
const app = express();
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true });
mongoose.connection.on("error", function(e) { console.error(e); });

const schema = mongoose.Schema({
  date: { type: Date, default: Date.now },
  name: String,
});
const Visitor = mongoose.model("Visitors", schema); // definimos el modelo

let myDateString = Date();
let good = "El visitante fue almacenado con éxito";

app.get('/', (req, res) => {
  let name = req.query.name;
  if (!name) {
   name = "Anónimo";
  }

  const person = new Visitor({
    name: name, // === name,
    date: myDateString,
  });

  person.save((error) => {
    if (error) {
      return res.send(error);
    }
    return res.send('<h1>'+good+'</h1>');
  });

});

app.listen(3000, () => console.log('Listening on port 3000!'));

/* COMENTARIOS DE EJERCICIOS ANTERIORES


NAVEGADOR:

const express = require('express');
const app = express();
app.get('/', (req, res) => {
  var ua = req.headers['user-agent'];
  res.send(ua);
});

app.listen(3000, () => console.log('Listening on port 3000!'));

SALUDAME 3:

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
  let formulario =('<form action="/" method="post">'+
    '<label for="name">'+'<input type="text" id="name" name="name">'+
    '<button type="submit">Enviar</button>'+
  '</form>');
  res.send(formulario);
});

app.post('/', (req, res) => {
  const name = req.body.name;
  res.send('<h1>Hola '+name+'!</h1>');
  res.end();
});

app.listen(3000, () => console.log('Listening on port 3000!'));

SALUDAME!!!
const express = require('express');
const app = express();
app.get('/makers/:nombre', (req, res) => {
  let name = req.params.nombre;
  name = name[0].toUpperCase() + name.slice(1);
  (name) ? (res.send('<h1>Hola '+name+'!</h1>')) :(res.send('<h1>Hola desconocido!</h1>'));
});
app.listen(3000, () => console.log('Listening on port 3000!'));

par impar:

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
app.listen(3000, () => console.log('Listening on port 3000!'));*/
