const repository = require("../Repository/awsRepository");

const uploadFile = async (filePath, bucketName, keyName) => {
   try {
      console.log("Chamando uploadFile...");
      const data = await repository.uploadFile(filePath, bucketName, keyName);

      if (!data || !data.location) { //Verificação para rodar o upload, ver se ele está vazio etc
         throw new Error("Retorno inválido do upload S3.");
      }

      console.log("Upload bem-sucedido, salvando no imageService...");

      return { success: true, location: data.Location };
   } catch (err) {
      console.error("Erro ao fazer upload:", err);
      throw new Error("Erro ao fazer upload: " + err.message);
   }
};

const downloadFile = async (filePath, bucketName, keyName) => {
   try {
      const path = await repository.downloadFile(filePath, bucketName, keyName);
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