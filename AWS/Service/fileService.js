const S3Repository = require('../Repository/S3Repository');

class FileService {
  async uploadFile(filePath, bucketName, keyName) {
    try {
      const fileUrl = await S3Repository.uploadFile(filePath, bucketName, keyName);
      return fileUrl;
    } catch (error) {
      throw error;
    }
  }

  async downloadFile(bucketName, keyName, downloadPath) {
    try {
      await S3Repository.downloadFile(bucketName, keyName, downloadPath);
      return downloadPath;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new FileService();