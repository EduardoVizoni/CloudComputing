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

// PEGAR TODOS OS IMAGENS CADASTRADOS
const getAllImages = (callback) => {
   connection.query("SELECT * FROM imagem", (error, results) => {
      if (error) throw error;
      callback(null, results);
   });
};

// PEGAR TODOS OS IMAGENS POR ID
const findById = (id, callback) => {
   connection.query(
      `SELECT * FROM imagem WHERE id = ?`,
      [id],
      (error, results) => {
         if (error) throw error;
         callback(null, results);
      }
   );
};

app.use(express.json());

// POSTA AS INFORMAÇÕES DO IMAGEM
const postImage = (id, referencia, data_criacao, titulo, callback) => {
    const query = "INSERT INTO imagem (id, referencia, data_criacao, titulo) VALUES (?, ?, ?, ?)";
    const values = [id, referencia, data_criacao, titulo];
    connection.query(query, values, (error, results) => {
        if (error) throw error;
        callback(null, results);
    });
};
