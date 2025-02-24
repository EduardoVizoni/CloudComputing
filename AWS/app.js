// src/app.js
const express = require('express');
const routes = require('./Routes');
const path = require('path');

const app = express();

// Middleware para ler JSON no corpo das requisições
app.use(express.json());

// Servir arquivos estáticos (imagens)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas
app.use('/api', routes);

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});