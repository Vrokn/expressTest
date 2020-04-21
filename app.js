const express = require('express');
var mongoose = require("mongoose");
const app = express();
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("error", function(e) { console.error(e); });

const schema = mongoose.Schema({
  count: { type: Number, default: 1 },
  name: String,
});

const Visitor = mongoose.model("Visitors", schema); // definimos el modelo

app.get('/', (req, res) => {
  let name = req.query.name;

    Visitor.findOne({ name: name }, async function(err, article) {
      if (err) return console.error(err);
      if (!article){
        const visitor = new Visitor({ name: name || "Anónimo" });
        await visitor.save();
      } else {
      article.count++;
      await article.save();
      }
      Visitor.find({}, (error, data) => {
          let tr = '';
          data.forEach((article) => {
            tr += ('<tr><td>'+article['_id']+'</td>'+
                       '<td>'+article.name+'</td>' +
                       '<td>'+article.count+'</td></tr>' );
          });
          let header = ('<table><thead><tr>'+
                          '<th class="text-center">'+"Id"+'</th>'+
                          '<th class="text-center">'+"Name"+'</th>'+
                          '<th class="text-center">'+"Visits"+'</th>'+
                     '</tr></thead>'+tr+'</table>');
          return  res.send(header);
        });
    });
});

app.listen(3000, () => console.log('Listening on port 3000!'));

/* COMENTARIOS DE EJERCICIOS ANTERIORES
--- SOLUCION PROPIA BASE DE DATOS:

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

---SOLUCION  MAKE IT  A BASE DE DATOS:

const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true });

const VisitorSchema = new mongoose.Schema({
  name: { type: String },
  date: { type: Date, default: Date.now }
});
const Visitor = mongoose.model("Visitor", VisitorSchema);

app.get("/", async (req, res) => {
  const visitor = new Visitor({ name: req.params.name || "Anónimo" });
  await visitor.save()

  res.send("<h1>El visitante fue almacenado con éxito.</h1>")
});

app.listen(3000, () => console.log("Listening on port 3000 ..."));

---NAVEGADOR:

const express = require('express');
const app = express();
app.get('/', (req, res) => {
  var ua = req.headers['user-agent'];
  res.send(ua);
});

app.listen(3000, () => console.log('Listening on port 3000!'));

---SALUDAME 3:

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

---SALUDAME!!!
const express = require('express');
const app = express();
app.get('/makers/:nombre', (req, res) => {
  let name = req.params.nombre;
  name = name[0].toUpperCase() + name.slice(1);
  (name) ? (res.send('<h1>Hola '+name+'!</h1>')) :(res.send('<h1>Hola desconocido!</h1>'));
});
app.listen(3000, () => console.log('Listening on port 3000!'));

---par impar:

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
