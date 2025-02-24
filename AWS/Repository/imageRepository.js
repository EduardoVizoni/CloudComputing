const pool = require('../Config/mysql');
const Image = require('../Model/imageModel');

class imageRepository {
  async findByUserId(userId) {
    const [rows] = await pool.query('SELECT * FROM images WHERE userId = ?', [userId]);
    return rows.map(row => new Image(row.id, row.userId, row.imageUrl, row.createdAt));
  }

  async create(image) {
    const [result] = await pool.query(
      'INSERT INTO images (userId, imageUrl) VALUES (?, ?)',
      [image.userId, image.imageUrl]
    );
    return result.insertId;
  }

  async delete(id) {
    await pool.query('DELETE FROM images WHERE id = ?', [id]);
  }
}

module.exports = new imageRepository();