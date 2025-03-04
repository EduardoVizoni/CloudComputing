const awsService = require("../Service/awsService");
const fs = require("fs");
const AWS = require("aws-sdk");

const uploadFile = async (req, res) => {
  const { filePath, bucketName, keyName } = req.body;

  try {
    const result = await awsService.uploadFile(filePath, bucketName, keyName);
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const downloadFile = async (req, res) => {
   const { keyName } = req.query;

   if (!keyName) {
      return res.status(400).json({
         success: false,
         message: "Parâmetro 'keyName' é obrigatório na URL"
      });
   }

   const bucketName = "bucketmi75"
   const downloadPath = `C:/Users/eduardo_vizoni-prado/Downloads/${keyName}`;

   try {
      const result = await awsService.downloadFile(

         bucketName,
         keyName,
         downloadPath
      );

      res.status(200).json({
         success: true,
         path: result
      });
   } catch (err) {
      res.status(500).json({
         success: false,
         message: "Erro no download: " + err.message
      });
   }
};

module.exports = {
  uploadFile,
  downloadFile,
};