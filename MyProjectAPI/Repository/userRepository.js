const express = require("express");
const mysql = require("mysql");
const axios = require("axios");
const app = express();
const PORT = 3000;
const connection = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "",
   database: "mundo",
});

class UsuarioRepository {
    constructor() {
        connection.connect();
    }

    getAll(callback) {
        this.connection.query("SELECT * FROM usuario", (error, results) => {
            if (error) throw error;
            callback(null, results);
        });
    }

    getById(id, callback) {
        this.connection.query(
            "SELECT * FROM usuario WHERE id = ?",
            [id],
            (error, results) => {
                if (error) throw error;
                callback(null, results[0]);
            }
        );
    }

    create(usuario, callback) {
        const query = "INSERT INTO usuario (id, nome, data_criacao) VALUES (?, ?, ?)";
        const values = [usuario.id, usuario.nome, usuario.data_criacao];
        connection.query(query, values, (error, results) => {
            if (error) throw error;
            callback(null, results);
        });
    };

    update(id, usuario, callback) {
        const query = "UPDATE usuario SET nome = ?, data_criacao = ? WHERE id = ?";
        const values = [usuario.nome, usuario.data_criacao, id];
        this.connection.query(query, values, (error, results) => {
            if (error) throw error;
            callback(null, results);
        });
    }

    delete(id, callback) {
        const query = "DELETE FROM usuario WHERE id = ?";
        this.connection.query(query, [id], (error, results) => {
            if (error) throw error;
            callback(null, results);
        });
    }
}

module.exports = new UsuarioRepository();