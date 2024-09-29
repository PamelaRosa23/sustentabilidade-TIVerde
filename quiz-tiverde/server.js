const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Configurações
const app = express();
const port = 3000; // Porta do servidor

app.use(cors());
app.use(bodyParser.json());

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost/quizdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Definir o esquema do ranking
const rankingSchema = new mongoose.Schema({
    name: String,
    percentage: Number
});

const Ranking = mongoose.model('Ranking', rankingSchema);

// Rotas
app.get('/ranking', async (req, res) => {
    const rankings = await Ranking.find().sort({ percentage: -1 });
    res.json(rankings);
});

app.post('/ranking', async (req, res) => {
    const { name, percentage } = req.body;
    const ranking = new Ranking({ name, percentage });
    await ranking.save();
    res.status(201).json(ranking);
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
