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
app.get("/imagem", (req, res) => {
   connection.query("SELECT * FROM imagem", (error, results) => {
      if (error) throw error;
      res.send(results);
   });
});

// PEGAR TODOS OS IMAGENS POR ID
app.get("/imagem/:id", (req, res) => {
   const { id } = req.params;
   connection.query(
      `SELECT * FROM imagem WHERE id = ${id}`,
      (error, results) => {
         if (error) throw error;
         res.send(results);
      }
   );
});

app.use(express.json());

// POSTA AS INFORMAÇÕES DO IMAGEM
app.post("/imagem", (req, res) => {
   const { id, referencia, data_criacao, titulo } = req.body;

   const query =
      "INSERT INTO imagem (id, referencia, data_criacao, titulo) VALUES (?, ?, ?, ?)";
   const values = [id, referencia, data_criacao, titulo];
   connection.query(query, values, (error, results) => {
      if (error) {
         console.error("Erro ao inserir dados:", error);
         return res
            .status(500)
            .send({ error: "Erro ao inserir dados no banco" });
      }
      res.send({
         message: "Imagem inserido com sucesso!",
         results,
      });
   });
});

// DELETA O IMAGEM POR ID
app.delete("/imagem/imgdeletebyid/:id", (req, res) => {
   const { id } = req.params;

   const checkQuery = "SELECT * FROM imagem WHERE id = ?";
   connection.query(checkQuery, [id], (error, results) => {
      if (error) {
         console.error("Erro ao verificar usuário:", error);
         return res
            .status(500)
            .send({ error: "Erro ao verificar dados no banco" });
      }

      if (results.length === 0) {
         return res.status(404).send({ error: "Imagem não encontrado" });
      }

      const updateQuery =
         "UPDATE imagem SET referencia = ?, data_criacao = ?, titulo = ? WHERE id = ?";
      const values = [referencia, data_criacao, titulo, id];

      connection.query(
         `DELETE FROM imagem WHERE id = ${id}`,
         (error, results) => {
            if (error) {
               console.error("Erro ao deletar dados:", error);
               return res
                  .status(500)
                  .send({ error: "Erro ao deletar dados do banco" });
            }
            res.send({
               message: "Imagem deletado com sucesso!",
               results,
            });
         }
      );
   });
});

// ATUALIZA O Imagem POR ID
app.put("/usuario/atualizarusuario/:id", (req, res) => {
   const { id } = req.params;
   const { referencia, data_criacao, titulo } = req.body;

   const checkQuery = "SELECT * FROM imagem WHERE id = ?";
   connection.query(checkQuery, [id], (error, results) => {
      if (error) {
         console.error("Erro ao verificar a imagem:", error);
         return res
            .status(500)
            .send({ error: "Erro ao verificar dados no banco" });
      }

      if (results.length === 0) {
         return res.status(404).send({ error: "Imagem não encontrado" });
      }

      const updateQuery =
         "UPDATE imagem SET referencia = ?, data_criacao = ?, titulo = ? WHERE id = ?";
      const values = [nome, data_criacao, titulo, id];
      connection.query(updateQuery, values, (updateError, updateResults) => {
         if (updateError) {
            console.error("Erro ao atualizar dados:", updateError);
            return res
               .status(500)
               .send({ error: "Erro ao atualizar dados no banco" });
         }

         res.send({
            message: "Imagem atualizada com sucesso!",
            updateResults,
         });
      });
   });
});

app.listen(PORT, () => {
   console.log(`Porta: ${PORT}`);
});
