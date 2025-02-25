const ImageService = require('../Service/imageService');

class imageController  {
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
      const { filePath, bucketName, keyName } = req.body;
      if (!filePath || !bucketName || !keyName) {
        return res.status(400).json({ error: 'filePath, bucketName e keyName são obrigatórios' });
      }

      const s3Url = await uploadFile(filePath, bucketName, keyName);

      res.status(200).json({ url: s3Url, message: 'Arquivo enviado com sucesso' });
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