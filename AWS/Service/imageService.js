// src/services/ImageService.js
const imageRepository = require('../repositories/ImageRepository');

class ImageService {
  async getImagesByUserId(userId) {
    return await imageRepository.findByUserId(userId);
  }

  async createImage(image) {
    return await imageRepository.create(image);
  }

  async deleteImage(id) {
    await imageRepository.delete(id);
  }
}

module.exports = new imageService();