import mongoose from 'mongoose';
import { Number } from 'core-js';
const Schema = mongoose.Schema;

const notaSchema = new Schema({
  cod: {type: Number, required: [true, 'Nombre obligatorio']},
  nombre: {type: String, required: [true, 'Nombre obligatorio']},
  descripcion: String,
  usuarioId: String,
  date:{type: Date, default: Date.now},
  activo: {type: Boolean, default: true}
});

// Convertir a modelo
const Nota = mongoose.model('Nota', notaSchema);

export default Nota;