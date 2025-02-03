/*  Criar um endpoint que receba dois números e retorne a subtração do primeiro pelo segundo.
    GET /subtract
    a (número), b (número)
    {"result": a - b}
*/

const express = require('express');
const app = express();
const port = 3000;

app.get('/subtract/:a/:b', async (req, res) => {
    const { a, b } = req.params;
    try {
        const numA = parseFloat(a);
        const numB = parseFloat(b);

        if (isNaN(numA) || isNaN(numB)) {
            throw new Error("Parâmetros inválidos. Certifique-se de enviar números em 'a' e 'b'.");
        }
        const result = numA - numB;
        res.status(200).json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});