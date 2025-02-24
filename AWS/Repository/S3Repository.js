const s3 = require('../Config/S3Client');
const fs = require('fs');

class S3Repository {
  async uploadFile(filePath, bucketName, keyName) {
    const fileContent = fs.readFileSync(filePath);

    const params = {
      Bucket: bucketName,
      Key: keyName,
      Body: fileContent,
    };

    try {
      const data = await s3.upload(params).promise();
      return data.Location; // Retorna a URL do arquivo no S3
    } catch (err) {
      console.error('Erro ao fazer o upload:', err);
      throw err;
    }
  }

  async downloadFile(bucketName, keyName, downloadPath) {
    const params = {
      Bucket: bucketName,
      Key: keyName,
    };

    const file = fs.createWriteStream(downloadPath);

    return new Promise((resolve, reject) => {
      s3.getObject(params)
        .createReadStream()
        .pipe(file)
        .on('close', () => {
          console.log('Arquivo baixado com sucesso:', downloadPath);
          resolve();
        })
        .on('error', (err) => {
          console.error('Erro ao baixar o arquivo:', err);
          reject(err);
        });
    });
  }
}

module.exports = new S3Repository();