const express = require("express");
const mysql = require('mysql');
const axios = require("axios");
const app = express();
const PORT = 3010;
const connection = mysql.createConnection({ host: "localhost", user: "root", password: "", database: "Mundo" });
connection.connect();


// PEGAR TODOS OS USUARIOS CADASTRADOS
const getUser = async (req, res) => {
    connection.query("SELECT * FROM tb_usuarios", (error, results) => {
        if (error) throw error;
        res.send(results);
    });
}

// PEGAR TODOS OS USUARIOS POR ID
const getById = async (req, res) => {
    const { id } = req.params;
    connection.query(`SELECT * FROM tb_usuarios WHERE id = ${id}`, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
}

app.use(express.json());

// POSTA AS INFORMAÇÕES DO USUARIO
const create = (req, res) => {
    const { id, nome, data_criacao } = req.body;

    // Validação dos campos obrigatórios
    if (!id || !nome || !data_criacao) {
        return res.status(400).send({ 
            error: "Campos obrigatórios faltando: id, nome, data_criacao" 
        });
    }

    // Query com prepared statements
    const query = "INSERT INTO tb_usuarios (id, nome, data_criacao) VALUES (?, ?, ?)";
    const values = [id, nome, data_criacao];

    connection.query(query, values, (error, results) => {
        if (error) {
            console.error("Erro no MySQL:", error.sqlMessage);
            return res.status(500).send({ 
                error: "Erro ao criar usuário",
                details: error.sqlMessage // Informação útil para debugging
            });
        }

        // Resposta adequada para criação (status 201)
        res.status(201).send({
            success: true,
            message: "Usuário criado com sucesso",
            insertedId: id,
            data: { id, nome, data_criacao }
        });
    });
};

// DELETA O USUARIO POR ID
const deleteUserById = async (req, res) => {
    const { id } = req.params;

    const checkQuery = "SELECT * FROM tb_usuarios WHERE id = ?";
    connection.query(checkQuery, [id], (error, results) => {
        if (error) {
            console.error("Erro ao verificar usuário:", error);
            return res.status(500).send({ error: "Erro ao verificar dados no banco" });
        }

        if (results.length === 0) {
            return res.status(404).send({ error: "Usuário não encontrado" });
        }

        const updateQuery = "UPDATE tb_usuarios SET nome = ?, data_criacao = ? WHERE id = ?";
        const values = [nome, data_criacao, id];

        connection.query(`DELETE FROM tb_usuarios WHERE id = ${id}`, (error, results) => {
            if (error) {
                console.error("Erro ao deletar dados:", error);
                return res.status(500).send({ error: "Erro ao deletar dados do banco" });
            }
            res.send({
                message: "Usuário deletado com sucesso!", results
            });
        });
    });
}


// ATUALIZA O USUARIO POR ID
const updateById = async(req, res) => {
    const { id } = req.params;
    const { nome, data_criacao } = req.body;

    const checkQuery = "SELECT * FROM tb_usuarios WHERE id = ?";
    connection.query(checkQuery, [id], (error, results) => {
        if (error) {
            console.error("Erro ao verificar usuário:", error);
            return res.status(500).send({ error: "Erro ao verificar dados no banco" });
        }

        if (results.length === 0) {
            return res.status(404).send({ error: "Usuário não encontrado" });
        }

        const updateQuery = "UPDATE tb_usuarios SET nome = ?, data_criacao = ? WHERE id = ?";
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
}

module.exports = {
    getUser,
    getById,
    create,
    deleteUserById,
    updateById
}

app.listen(PORT, () => {
    console.log(`Porta: ${PORT}`);
});