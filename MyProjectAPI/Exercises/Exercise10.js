/*  Criar um endpoint que calcule a idade de uma pessoa com base no ano de nascimento.
    GET /calculate-age/:birth_year
    birth_year (inteiro)
    {"age": current_year - birth_year}
*/

const express = require('express');
const app = express();
const port = 3000;

app.get('/calculate-age/:birth_year', async (req, res) => {
    const currentYear = new Date().getFullYear();
    const { birth_year } = req.params;
    try {
        const birthYearNum = parseInt(birth_year);

        if (isNaN(birthYearNum)) {
            throw new Error("Ano de nascimento inválido.");
        }
        const age = currentYear - birthYearNum;
        res.status(200).json({ age });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});