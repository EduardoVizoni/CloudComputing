const pool = require('../Config/mysql');
const User = require('../Model/userModel');

class userRepository {
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows.map(row => new User(row.id, row.name, row.email, row.createdAt));
  }

  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    if (rows.length > 0) {
      const row = rows[0];
      return new User(row.id, row.name, row.email, row.createdAt);
    }
    return null;
  }

  async create(user) {
    await pool.query('INSERT INTO users (name, email) VALUES (?, ?)', [user.name, user.email]);
  }

  async update(id, user) {
    await pool.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [user.name, user.email, id]);
  }

  async delete(id) {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
  }
}

module.exports = new userRepository();