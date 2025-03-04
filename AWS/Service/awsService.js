const repository = require("../Repository/awsRepository");
const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");
const s3AWS = new AWS.S3();

const uploadFile = async (filePath, bucketName, keyName) => {
  try {
    console.log("Chamando uploadFile...");
    const data = await repository.uploadFile(filePath, bucketName, keyName);

    if (!data || !data.location) {
      //Verificação para rodar o upload, ver se ele está vazio etc
      throw new Error("Retorno inválido do upload S3.");
    }

    console.log("Upload bem-sucedido, salvando no imageService...");

    return { success: true, location: data.Location };
  } catch (err) {
    console.error("Erro ao fazer upload:", err);
    throw new Error("Erro ao fazer upload: " + err.message);
  }
};

const downloadFile = async (bucketName, keyName, downloadPath) => {
  try {
    if (!bucketName || !keyName || !downloadPath) {
      throw new Error("Parâmetros internos ausentes");
    }

    const params = { Bucket: bucketName, Key: keyName };
    const data = await s3AWS.getObject(params).promise();

    fs.mkdirSync(path.dirname(downloadPath), { recursive: true });
    fs.writeFileSync(downloadPath, data.Body);

    return downloadPath;
  } catch (error) {
    throw new Error("Falha no download: " + error.message);
  }
};

module.exports = {
  uploadFile,
  downloadFile,
};
