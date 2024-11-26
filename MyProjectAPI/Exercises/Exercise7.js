/*  Criar um endpoint que receba um número e informe se ele é par ou ímpar.
    GET /check-parity/:number
    number (inteiro)
    {"parity": "par"} ou {"parity": "ímpar"}
*/

const express = require('express');
const app = express();
const port = 3000;

app.get('/check-parity/:number', async (req, res) => {
    const { number } = req.params;
    const parsedNumber = parseInt(number, 10);
    try {
        if (isNaN(parsedNumber)) {
            throw new Error("Parâmetro inválido. Certifique-se de enviar um número inteiro.");
        }
        const parity = parsedNumber % 2 === 0 ? "par" : "ímpar";
        res.status(200).json({ parity });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});