// Importa as Dependências
const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;

app.get("/hello", async (req, res) => {
    res.json({ mensage: "Olá Mundo!" });
});

app.get("/greet/:name", async (req, res) => {
    const { name } = req.params;
    try {
        res.status(200).json({ message: `Olá, ${name}!` });
    } catch (error) {
        res.status(500).json({ error: "ERROR" });
    }
});

app.get("/sum/:a/:b", async (req, res) => {
    const { a, b } = req.params;
    try {
        const numA = parseFloat(a);
        const numB = parseFloat(b);

        if (isNaN(numA) || isNaN(numB)) {
            return res.status(404).json({ message: "Erro: Numero inválido" });
        }

        const resultado = numA + numB;
        res.status(200).json({ message: `result: ${resultado}` });
    } catch (error) {
        res.status(500).json({ error: "ERROR" });
    }
});

app.get("/subtract/:a/:b", async (req, res) => {
    const { a, b } = req.params;
    try {
        const numA = parseFloat(a);
        const numB = parseFloat(b);

        if (isNaN(numA) || isNaN(numB)) {
            return res.status(404).json({ message: "Erro: Numero inválido" });
        }

        const resultado = numA - numB;
        res.status(200).json({ message: `result: ${resultado}` });
    } catch (error) {
        res.status(500).json({ error: "ERROR" });
    }
});

app.get("/multiply/:a/:b", async (req, res) => {
    const { a, b } = req.params;
    try {
        const numA = parseFloat(a);
        const numB = parseFloat(b);

        if (isNaN(numA) || isNaN(numB)) {
            return res.status(404).json({ message: "Erro: Numero inválido" });
        }

        const resultado = numA * numB;
        res.status(200).json({ message: `result: ${resultado}` });
    } catch (error) {
        res.status(500).json({ error: "ERROR" });
    }
});

app.get("/divide/:a/:b", async (req, res) => {
    const { a, b } = req.params;
    try {
        const numA = parseFloat(a);
        const numB = parseFloat(b);

        if (isNaN(numA) || isNaN(numB)) {
            return res.status(404).json({ message: "Erro: Numero inválido" });
        } else if (numB > numA) {
            return res.status(404).json({ mensage: "O primeiro número tem que ser igual ou maior do que o segundo número" });
        }

        const resultado = numA / numB;
        res.status(200).json({ message: `result: ${resultado}` });
    } catch (error) {
        res.status(500).json({ error: "ERROR" });
    }
});

app.get("/check-parity/:number", async (req, res) => {
    const { number } = req.params;

    try {
        const a = parseInt(number);

        if (isNaN(a)) {
            return res.status(404).json({ mensage: "Erro: Número inválido" });
        }

        if (a >= 0) {
            if (a % 2 == 0) {
                res.status(200).json({ mensage: `O número ${a} é par` });
            } else {
                res.status(200).json({ mensage: `O número ${a} é ímpar` });
            }
        }
    } catch (error) {
        res.status(500).json({ error: "ERROR" });
    }
});

app.get("/full-name/:first/:last", async (req, res) => {
    const { first, last } = req.params;
    try {
        const a = String(first);
        const b = String(last);
        res.status(200).json({ full_name: `${a} ${b}` });
    } catch (error) {
        res.status(500).json({ error: "ERROR" });
    }
});

app.get("/convert-temperature/:celsius", async (req, res) => {
    const { celsius } = req.params;
    try {
        const a = Number(celsius);

        const fah = (celsius * 9 / 5) + 32
        res.status(200).json({ fahrenheit: `${fah}` });
    } catch (error) {
        res.status(500).json({ error: "ERROR" });
    }
});

app.get("/calculate-age/:birth_year", async (req, res) => {
    const { birth_year } = req.params;
    try {
        const a = parseInt(birth_year);
        const current_year = 2024;

        const age = current_year - a;
        res.status(200).json({ age: `${age}` });
    } catch (error) {
        res.status(500).json({ error: "ERROR" });
    }
});

app.listen(PORT, () => {
    console.log(`Porta: ${PORT}`);
});