const UserRepository = require('../Repository/userRepository');

class UserService {
  async getAllUsers() {
    return await UserRepository.findAll();
  }

  async getUserById(id) {
    return await UserRepository.findById(id);
  }

  async createUser(user) {
    await UserRepository.create(user);
  }

  async updateUser(id, user) {
    await UserRepository.update(id, user);
  }

  async deleteUser(id) {
    await UserRepository.delete(id);
  }
}

module.exports = new UserService();