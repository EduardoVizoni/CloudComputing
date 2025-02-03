const express = require("express");
const mysql = require('mysql');
const axios = require("axios");
const app = express();
const PORT = 3000;
const connection = mysql.createConnection({ host: "localhost", user: "root", password: "", database: "Mundo" });
connection.connect();

// PEGAR TODOS OS USUARIOS CADASTRADOS
app.get("/usuario", (req, res) => {
    connection.query("SELECT * FROM usuario", (error, results) => {
        if (error) throw error;
        res.send(results);
    })
});

// PEGAR TODOS OS USUARIOS POR ID
app.get("/usuario/:id", (req, res) => {
    const { id } = req.params;
    connection.query(`SELECT * FROM usuario WHERE id = ${id}`, (error, results) => {
        if (error) throw error;
        res.send(results);
    })
});

app.use(express.json());

// POSTA AS INFORMAÇÕES DO USUARIO
app.post("/usuario", (req, res) => {
    const { id, nome, data_criacao } = req.body;

    const query = "INSERT INTO usuario (id, nome, data_criacao) VALUES (?, ?, ?)";
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

// DELETA O USUARIO POR ID
app.delete("/usuario/userdeletebyid/:id", (req, res) => {
    const { id } = req.params;

    const checkQuery = "SELECT * FROM usuario WHERE id = ?";
    connection.query(checkQuery, [id], (error, results) => {
        if (error) {
            console.error("Erro ao verificar usuário:", error);
            return res.status(500).send({ error: "Erro ao verificar dados no banco" });
        }

        if (results.length === 0) {
            return res.status(404).send({ error: "Usuário não encontrado" });
        }

        const updateQuery = "UPDATE usuario SET nome = ?, data_criacao = ? WHERE id = ?";
        const values = [nome, data_criacao, id];

        connection.query(`DELETE FROM usuario WHERE id = ${id}`, (error, results) => {
            if (error) {
                console.error("Erro ao deletar dados:", error);
                return res.status(500).send({ error: "Erro ao deletar dados do banco" });
            }
            res.send({
                message: "Usuário deletado com sucesso!", results
            });
        });
    });
});

// ATUALIZA O USUARIO POR ID
app.put("/usuario/atualizarusuario/:id", (req, res) => {
    const { id } = req.params;
    const { nome, data_criacao } = req.body;

    const checkQuery = "SELECT * FROM usuario WHERE id = ?";
    connection.query(checkQuery, [id], (error, results) => {
        if (error) {
            console.error("Erro ao verificar usuário:", error);
            return res.status(500).send({ error: "Erro ao verificar dados no banco" });
        }

        if (results.length === 0) {
            return res.status(404).send({ error: "Usuário não encontrado" });
        }

        const updateQuery = "UPDATE usuario SET nome = ?, data_criacao = ? WHERE id = ?";
        const values = [nome, data_criacao, id];
        connection.query(updateQuery, values, (updateError, updateResults) => {
            if (updateError) {
                console.error("Erro ao atualizar dados:", updateError);
                return res.status(500).send({ error: "Erro ao atualizar dados no banco" });
            }

            res.send({
                message: "Usuário atualizado com sucesso!", updateResults
            });
        });
    });
});


app.listen(PORT, () => {
    console.log(`Porta: ${PORT}`);
});