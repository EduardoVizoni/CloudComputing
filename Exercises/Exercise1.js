/*  Criar um endpoint básico de GET que retorna uma mensagem simples.
    GET /hello
    {"message": "Olá Mundo!"}
*/

const express = require('express');
const app = express();
const port = 3000;

app.get('/hello', async (req, res) => {
    try {
        res.status(200).json({ message: `Olá Mundo!` });
    } catch (error) {
        res.status(500).json({ error: "Error" });
    }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
