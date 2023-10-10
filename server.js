// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Ingresso = require('./models/Ingresso'); // Importe o modelo de Ingresso
const db = require('./config/db'); // Importe a configuração do MongoDB

const app = express();

app.use(bodyParser.json());
app.use(cors()); // Habilita o CORS



// Rota para verificar a validade do ingresso
app.get('/api/verificarIngresso', async (req, res) => {
  try {
    const { valor } = req.query; // Valor lido do QR Code

    // Verifique no banco de dados se o ingresso com o valor lido é válido
    const ingressoValido = await Ingresso.findOne({ valor });

    if (ingressoValido) {
      // Ingresso válido
      // Implemente aqui a lógica para marcar o ingresso como utilizado na base de dados, se necessário
      res.status(200).json({ ingressoValido: true });
    } else {
      // Ingresso inválido
      res.status(200).json({ ingressoValido: false });
    }
  } catch (error) {
    console.error('Erro ao verificar o ingresso:', error);
    res.status(500).json({ error: 'Erro ao verificar o ingresso' });
  }
});



// Rota para registrar ingressos
app.post('/api/ingressos', async (req, res) => {
  try {
    const { nome, contato } = req.body;

    // Crie um novo ingresso no banco de dados
    const novoIngresso = new Ingresso({ nome, contato });

    // Salve o ingresso no banco de dados
    await novoIngresso.save();

    res.status(201).json(novoIngresso);
  } catch (error) {
    console.error('Erro ao registrar ingresso:', error);
    res.status(500).json({ error: 'Erro ao registrar ingresso' });
  }
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});


app.get('/api/ingressos', async (req, res) => {
    try {
      const ingressos = await Ingresso.find(); // Recupere todos os ingressos do banco de dados
      res.status(200).json(ingressos);
    } catch (error) {
      console.error('Erro ao buscar ingressos:', error);
      res.status(500).json({ error: 'Erro ao buscar ingressos' });
    }
  });
