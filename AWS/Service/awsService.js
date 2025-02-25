const repository = require("../Repository/S3Repository");

const uploadFile = async (req, res) => {
   const { filePath, bucketName, keyName } = req.body;

   try {
     const location = await S3Service.uploadFile(filePath, bucketName, keyName);
     res.status(200).json({ location });
   } catch (err) {
     res.status(500).json({ error: err.message });
   }
 };
const downloadFile = async (downloadPath, bucketName, keyName) => {
   try {
      const path = await repository.downloadFile(downloadPath, bucketName, keyName);
      return { success: true, path };
   } catch (err) {
      console.error("Erro no download:", err.message);
      return { success: false, error: err.message };
   }
};

module.exports = {
   uploadFile,
   downloadFile,
};