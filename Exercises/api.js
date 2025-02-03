// Importa as dependências
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.get('/pessoa/nome/:nome', async (req, res) => {
    const { nome } = req.params;
    try {
        res.status(200).json({ message: `Nome: ${nome}` });
    } catch (error) {
        res.status(500).json({ error: "Error" });
    }
});

app.get('/pessoa/id/:id', async (req, res) => {
    const { id } = req.params;
    try {
        res.status(200).json({ message: `ID: ${id}` });
    } catch (error) {
        res.status(500).json({ error: "Error" });
    }
});

app.get('/pessoa/cpf/:cpf', async (req, res) => {
    const { cpf } = req.params;
    try {
        res.status(200).json({ message: `CPF: ${cpf}` });
    } catch (error) {
        res.status(500).json({ error: "Error" });
    }
});

app.listen(PORT, () => {
    console.log(`porta : ${PORT}`);
})