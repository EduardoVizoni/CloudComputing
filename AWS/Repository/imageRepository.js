const pool = require('../Config/mysql');
const Image = require('../Model/imageModel');

class imageRepository  {
  async findByUserId(userId) {
    const [rows] = await pool.query('SELECT * FROM images WHERE userId = ?', [userId]);
    return rows.map(row => new Image(row.id, row.userId, row.imageUrl, row.createdAt));
  }

  async uploadToS3(imageUrl, bucketName, keyName) {
    try {
      // Faz o download da imagem
      const response = await fetch(imageUrl);
      const buffer = await response.buffer();

      // Parâmetros para o upload no S3
      const params = {
        Bucket: bucketName,
        Key: keyName,
        Body: buffer,
        ContentType: 'image/jpeg', // Ajuste o tipo de conteúdo conforme necessário
      };

      // Faz o upload para o S3
      const data = await s3.upload(params).promise();
      return data.Location; // Retorna a URL da imagem no S3
    } catch (error) {
      throw new Error(`Erro ao enviar imagem para o S3: ${error.message}`);
    }
  }

  async create({ userId, imageUrl }) {
    try {
      const bucketName = ''; // Nome do seu bucket no S3
      const keyName = `images/${Date.now()}-${userId}.jpg`; // Nome único para a imagem

      // Faz o upload da imagem para o S3
      const s3ImageUrl = await this.uploadToS3(imageUrl, bucketName, keyName);

      // Salva a URL da imagem no banco de dados
      const [result] = await pool.query(
        'INSERT INTO images (userId, imageUrl) VALUES (?, ?)',
        [userId, s3ImageUrl]
      );
      return result.insertId;
    } catch (error) {
      throw new Error(`Erro ao salvar imagem no banco de dados: ${error.message}`);
    }
  }

  async delete(id) {
    await pool.query('DELETE FROM images WHERE id = ?', [id]);
  }
}

module.exports = new imageRepository ();