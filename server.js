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



// Rota para verificar ingressos
app.post('/api/verificar-ingresso', async (req, res) => {
  try {
    const { qrCode } = req.body;

    // Verifique se o ingresso com o QR code especificado existe
    const ingresso = await Ingresso.findOne({ qrCode });

    if (ingresso) {
      // Marque o ingresso como utilizado
      ingresso.utilizado = true;
      await ingresso.save();
      res.status(200).json({ ingressoValido: true, numeroIngresso: ingresso.numeroIngresso });
    } else {
      res.status(200).json({ ingressoValido: false });
    }
  } catch (error) {
    console.error('Erro ao verificar o ingresso:', error);
    res.status(500).json({ error: 'Erro ao verificar o ingresso' });
  }
});

// Rota para marcar ingressos como utilizados
app.put('/api/marcar-utilizado/:numeroIngresso', async (req, res) => {
  try {
    const { numeroIngresso } = req.params;

    // Encontre o ingresso pelo número do ingresso e marque como utilizado
    const ingresso = await Ingresso.findOneAndUpdate(
      { numeroIngresso },
      { utilizado: true },
      { new: true }
    );

    if (ingresso) {
      res.status(200).json({ message: 'Ingresso marcado como utilizado com sucesso.' });
    } else {
      res.status(404).json({ error: 'Ingresso não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao marcar o ingresso como utilizado:', error);
    res.status(500).json({ error: 'Erro ao marcar o ingresso como utilizado' });
  }
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});
