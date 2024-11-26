/*  Criar um service para conetar ao banco de dados MYSQL
    Criar um CRUD ( POST, GET, DELETE, PUT ) de USUARIO (id, nome, data_criacao)
    Criar um CRUD de IMAGEM ( id, referencia, data_criacao, titulo)
*/

const express = require('express');
const app = express();
const port = 3000;
const db = require('./Database');

app.use(express.json());

// POST: Criar um usuário
app.post('/usuarios/:nome', (req, res) => {
  const { nome } = req.params;
  
  if (!nome) {
    return res.status(400).json({ mensagem: "Por favor, forneça um nome para o usuário." });
  }

  db.query('INSERT INTO users (nome) VALUES (?)', [nome], (err, results) => {
    if (err) {
      return res.status(500).json({ mensagem: "Ocorreu um erro ao criar o usuário. Tente novamente mais tarde." });
    }
    res.status(201).json({ id: results.insertId, nome, data_criacao: new Date(), mensagem: "Usuário criado com sucesso!" });
  });
});

// GET: Listar todos os usuários
app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).json({ mensagem: "Não foi possível recuperar os usuários. Tente novamente mais tarde." });
    }
    if (results.length === 0) {
      return res.status(200).json({ mensagem: "Ainda não há usuários cadastrados." });
    }
    res.status(200).json(results);
  });
});

// GET: Obter um usuário específico
app.get('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ mensagem: "Erro ao buscar o usuário. Tente novamente mais tarde." });
    }
    if (results.length === 0) {
      return res.status(404).json({ mensagem: `Usuário com ID ${id} não encontrado.` });
    }
    res.status(200).json(results[0]);
  });
});

// PUT: Atualizar um usuário
app.put('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ mensagem: "Por favor, forneça um nome para atualizar o usuário." });
  }

  db.query('UPDATE users SET nome = ? WHERE id = ?', [nome, id], (err, results) => {
    if (err) {
      return res.status(500).json({ mensagem: "Erro ao atualizar o usuário. Tente novamente mais tarde." });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ mensagem: `Não encontramos o usuário com ID ${id}.` });
    }
    res.status(200).json({ id, nome, mensagem: "Usuário atualizado com sucesso!" });
  });
});

// DELETE: Excluir um usuário
app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ mensagem: "Erro ao excluir o usuário. Tente novamente mais tarde." });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ mensagem: `Não encontramos o usuário com ID ${id} para excluir.` });
    }
    res.status(200).json({ mensagem: `Usuário com ID ${id} excluído com sucesso!` });
  });
});

// CRUD de Imagens
// POST: Criar uma imagem
app.post('/imagens', (req, res) => {
  const { referencia, titulo } = req.body;

  if (!referencia || !titulo) {
    return res.status(400).json({ mensagem: "Por favor, forneça uma referência e um título para a imagem." });
  }

  db.query('INSERT INTO images (referencia, titulo) VALUES (?, ?)', [referencia, titulo], (err, results) => {
    if (err) {
      return res.status(500).json({ mensagem: "Ocorreu um erro ao criar a imagem. Tente novamente mais tarde." });
    }
    res.status(201).json({ id: results.insertId, referencia, titulo, data_criacao: new Date(), mensagem: "Imagem criada com sucesso!" });
  });
});

// GET: Listar todas as imagens
app.get('/imagens', (req, res) => {
  db.query('SELECT * FROM images', (err, results) => {
    if (err) {
      return res.status(500).json({ mensagem: "Não foi possível recuperar as imagens. Tente novamente mais tarde." });
    }
    if (results.length === 0) {
      return res.status(200).json({ mensagem: "Ainda não há imagens cadastradas." });
    }
    res.status(200).json(results);
  });
});

// PUT: Atualizar uma imagem
app.put('/imagens/:id', (req, res) => {
  const { id } = req.params;
  const { referencia, titulo } = req.body;

  if (!referencia || !titulo) {
    return res.status(400).json({ mensagem: "Por favor, forneça uma referência e um título para atualizar a imagem." });
  }

  db.query('UPDATE images SET referencia = ?, titulo = ? WHERE id = ?', [referencia, titulo, id], (err, results) => {
    if (err) {
      return res.status(500).json({ mensagem: "Erro ao atualizar a imagem. Tente novamente mais tarde." });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ mensagem: `Não encontramos a imagem com ID ${id} para atualizar.` });
    }
    res.status(200).json({ id, referencia, titulo, mensagem: "Imagem atualizada com sucesso!" });
  });
});

// DELETE: Excluir uma imagem
app.delete('/imagens/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM images WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ mensagem: "Erro ao excluir a imagem. Tente novamente mais tarde." });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ mensagem: `Não encontramos a imagem com ID ${id} para excluir.` });
    }
    res.status(200).json({ mensagem: `Imagem com ID ${id} excluída com sucesso!` });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});