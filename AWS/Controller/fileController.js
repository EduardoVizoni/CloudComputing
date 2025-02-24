const FileService = require('../Service/fileService');

class FileController {
  async uploadFile(req, res) {
    try {
      const { filePath, bucketName, keyName } = req.body;
      const fileUrl = await FileService.uploadFile(filePath, bucketName, keyName);
      res.json({ fileUrl });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async downloadFile(req, res) {
    try {
      const { bucketName, keyName, downloadPath } = req.body;
      await FileService.downloadFile(bucketName, keyName, downloadPath);
      res.json({ message: 'Arquivo baixado com sucesso', downloadPath });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new FileController();