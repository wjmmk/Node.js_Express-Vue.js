import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

const app = express();

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
//application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); // Se habilita para que el servidor pueda recibir datos de un formulario.


// *** Conexión base de datos
const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/myapp';
const options = {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true};

// Or using promises
mongoose.connect(uri, options).then(
  /* ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
  () => { console.log('Conectado a DB') },
  /* handle initial connection error */
  err => { console.log(err) });


// *** Rutas
app.get('/', (req, res) => {
  res.send('Hello World Bienvenidos a mis Desarrollos Web!');
});

app.use('/api', require('./routes/index'));

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

//** Configuracion de Variables de Entorno y Conexion a la aplicacion.*/
app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), () => {
  console.log('Aplicacion Iniciada & listening on port'+ app.get('puerto'));
});