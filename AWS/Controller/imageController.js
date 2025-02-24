const imageService = require('../Service/imageService');

class imageController {
  async getImagesByUserId(req, res) {
    try {
      const images = await imageService.getImagesByUserId(req.params.userId);
      res.json(images);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createImage(req, res) {
    try {
      const { userId } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
      const imageId = await imageService.createImage({ userId, imageUrl });
      res.status(201).json({ id: imageId, message: 'Imagem criada com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteImage(req, res) {
    try {
      await imageService.deleteImage(req.params.id);
      res.json({ message: 'Imagem deletada com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new imageController();