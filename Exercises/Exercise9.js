/*  Criar um endpoint que converta uma temperatura em Celsius para Fahrenheit.
    GET /convert-temperature
    celsius (número)
    {"fahrenheit": (celsius * 9/5) + 32}
*/ 

const express = require('express');
const app = express();
const port = 3000;

app.get('/convert-temperature/:celsius', async (req, res) => {
    const { celsius } = req.params;
    const celsiusNum = parseFloat(celsius);
    try {
        if (isNaN(celsiusNum)) {
            throw new Error("Por favor, forneça um valor numérico válido para 'celsius'.");
        }
        const fahrenheit = (celsiusNum * 9/5) + 32;
        res.status(200).json({ fahrenheit });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});