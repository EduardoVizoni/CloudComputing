/*  Criar um endpoint que aceite dois parâmetros (primeiro nome e sobrenome) e retorne o nome completo.
    GET /full-name
    first_name (string), last_name (string)
    {"full_name": "first_name last_name"}
*/ 

const express = require('express');
const app = express();
const port = 3000;

app.get('/full-name/:first_name/:last_name', async (req, res) => {
    const { first_name, last_name } = req.params; 
    try {
        res.status(200).json({ full_name: `Nome: ${first_name} ${last_name}`});
    } catch (error) {
        res.status(500).json({ error: "Error" });
    }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});