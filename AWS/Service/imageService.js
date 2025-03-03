// src/services/ImageService.js

const ImageRepository = require('../Repository/imageRepository');

class ImageService {
  async getImagesByUserId(userId) {
    return await ImageRepository.findByUserId(userId);
  }

  async createImage({ userId, imageUrl }) {
    if (!userId || !imageUrl) {
      throw new Error('userId e imageUrl são obrigatórios');
    }

    const imageId = await ImageRepository.create({ userId, imageUrl });
    return imageId;

}
  async deleteImage(id) {
    await ImageRepository.delete(id);
  }
}

module.exports = new ImageService();