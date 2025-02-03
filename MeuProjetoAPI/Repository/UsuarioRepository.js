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
connection.connect();

// PEGAR TODOS OS USUARIOS CADASTRADOS
const getAllUsuarios = (callback) => {
   connection.query("SELECT * FROM usuario", (error, results) => {
      if (error) throw error;
      callback(null, results);
   });
};

// PEGAR TODOS OS USUARIOS POR ID
const findById = (id, callback) => {
   connection.query(
      `SELECT * FROM usuario WHERE id = ?`,
      [id],
      (error, results) => {
         if (error) throw error;
         callback(null, results);
      }
   );
};

app.use(express.json());

// POSTA AS INFORMAÇÕES DO USUARIOS
const postUsuarios = (id, nome, data_criacao, callback) => {
    const query = "INSERT INTO usuario (id, nome, data_criacao) VALUES (?, ?, ?)";
    const values = [id, nome, data_criacao];
    connection.query(query, values, (error, results) => {
        if (error) throw error;
        callback(null, results);
    });
};
