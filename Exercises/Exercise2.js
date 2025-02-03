/*  Criar um endpoint que aceite um parâmetro de nome e retorne uma mensagem personalizada.
    GET /greet/:name
    name (string)
    {"message": "Olá, {name}!"}
*/

const express = require('express');
const app = express();
const port = 3000;

app.get('/greet/:name', async (req, res) => {
    const { name } = req.params;
    try {
        res.status(200).json({ message: `Olá, ${name}!` });
    } catch (error) {
        res.status(500).json({ error: "Error" });
    }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});