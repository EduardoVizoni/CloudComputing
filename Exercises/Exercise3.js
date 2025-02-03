/*  Criar um endpoint que receba dois números como parâmetros e retorne a soma deles.
    GET /sum
    a (número), b (número)
    {"result": a + b}
*/

const express = require('express');
const app = express();
const port = 3000;

app.get('/sum/:a/:b', async (req, res) => {
    const { a, b } = req.params;
    try {
        const numA = parseFloat(a);
        const numB = parseFloat(b);
        
        if (isNaN(numA) || isNaN(numB)) {
            return res.status(400).json({ error: "Parâmetros inválidos. Certifique-se de passar números em 'a' e 'b'." });
        }

        const result = numA + numB;
        res.status(200).json({ message: `Result: ${result}` });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});