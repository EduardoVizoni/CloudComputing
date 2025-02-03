/*  Criar um service para conetar ao banco de dados MYSQL
    Criar um CRUD ( POST, GET, DELETE, PUT ) de USUARIO (id, nome, data_criacao)
    Criar um CRUD de IMAGEM ( id, referencia, data_criacao, titulo)
*/
const mysql = require('mysql');
const express = require('express');
const app = express();
const port = 3000;
const connection = mysql.createConnection({ host: "localhost", user: "root", password: "", database: "crud_app" });
connection.connect();

app.use(express.json());

// POST: Criar usuário
app.post("/users", (req, res) => {
    const { id, nome, data_criacao } = req.body;

    const query = "INSERT INTO users (id, nome, data_criacao) VALUES (?, ?, ?)";
    const values = [id, nome, data_criacao];
    connection.query(query, values, (error, results) => {
        if (error) {
            console.error("Erro ao inserir dados:", error);
            return res.status(500).send({ error: "Erro ao inserir dados no banco" });
        }
        res.send({
            message: "Usuário inserido com sucesso!", results
        });
    });
});

// GET: Obter todos os usuários
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});


// DELETE: Deletar um usuário
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM users WHERE id = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.status(200).json({ message: 'Usuário deletado com sucesso' });
    });
});

// PUT: Atualizar um usuário
app.put('/users/:id', (req, res) => {
    const { id } = req.params;  // ID ainda vem pela URL
    const { nome } = req.body;  // Nome vem no corpo da requisição

    const sql = 'UPDATE users SET nome = ? WHERE id = ?';
    connection.query(sql, [nome, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.status(200).json({ message: 'Usuário atualizado com sucesso', id, nome });
    });
});

// CRUD de Imagens
// POST: Criar uma imagem
app.post('/images', (req, res) => {
  const { referencia, titulo } = req.body;

  if (!referencia || !titulo) {
    return res.status(400).json({ mensagem: "Por favor, forneça uma referência e um título para a imagem." });
  }

  connection.query('INSERT INTO images (referencia, titulo) VALUES (?, ?)', [referencia, titulo], (err, results) => {
    if (err) {
      return res.status(500).json({ mensagem: "Ocorreu um erro ao criar a imagem. Tente novamente mais tarde." });
    }
    res.status(201).json({ id: results.insertId, referencia, titulo, data_criacao: new Date(), mensagem: "Imagem criada com sucesso!" });
  });
});

// GET: Listar todas as imagens
app.get('/images', (req, res) => {
  connection.query('SELECT * FROM images', (err, results) => {
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
app.put('/images/:id', (req, res) => {
  const { id } = req.params;
  const { referencia, titulo } = req.body;

  if (!referencia || !titulo) {
    return res.status(400).json({ mensagem: "Por favor, forneça uma referência e um título para atualizar a imagem." });
  }

  connection.query('UPDATE images SET referencia = ?, titulo = ? WHERE id = ?', [referencia, titulo, id], (err, results) => {
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
app.delete('/images/:id', (req, res) => {
  const { id } = req.params;

  connection.query('DELETE FROM images WHERE id = ?', [id], (err, results) => {
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