// models/Ingresso.js
const mongoose = require('mongoose');

const ingressoSchema = new mongoose.Schema({
  nome: String,
  contato: String,
  numero: Number,
});

module.exports = mongoose.model('Ingresso', ingressoSchema);
