// config/db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:adminadmin@cluster0.kp0ii67.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Conexão com o MongoDB estabelecida com sucesso!');
});

mongoose.connection.on('error', (err) => {
  console.error('Erro na conexão com o MongoDB:', err);
});
