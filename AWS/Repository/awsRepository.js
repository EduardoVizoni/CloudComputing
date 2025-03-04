const s3 = require("../Config/S3Client.js");
const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");
const s3AWS = new AWS.S3();


class awsRepository {
  static uploadFile = async (filePath, bucketName, keyName) => {
    try {
      if (!filePath) {
        throw new Error("Caminho do arquivo não pode ser undefined.");
      }

      console.log("Iniciando upload do arquivo:", filePath);

      const fileContent = fs.readFileSync(filePath);
      const params = { Bucket: bucketName, Key: keyName, Body: fileContent };

      // Realiza o upload
      const data = await s3.upload(params).promise();

      // Verifica o retorno do upload
      console.log("Resposta do upload S3:", data); // Registrando execução

      if (!data || !data.Location) {
        throw new Error(
          "Falha no upload para o S3, a propriedade 'Location' está ausente."
        );
      }

      // Extrai o tipo de imagem a partir da extensão do arquivo
      const fileExtension = path.extname(filePath).toLowerCase();
      if (!fileExtension) {
        throw new Error("Tipo de arquivo não detectado.");
      }

      console.log("Upload bem-sucedido. Tipo de imagem:", fileExtension);
      return { location: data.Location, fileExtension };
    } catch (error) {
      console.error("Erro no upload:", error.message);
      throw error;
    }
  };

  static downloadFile = async (bucketName, keyName, downloadPath) => {
    try {
      const params = {
        Bucket: bucketName,
        Key: keyName,
      };

      const data = await s3AWS.getObject(params).promise();

      fs.writeFileSync(downloadPath, data.Body);
      return downloadPath;
    } catch (error) {
      throw new Error("Erro no download: " + error.message);
    }
  };
}

module.exports = awsRepository;
