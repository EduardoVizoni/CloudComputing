const s3 = require("../Config/S3Client.js");
const fs = require("fs");

class awsRepository {

    static uploadFile = (filePath, bucketName, keyName) => {
      return new Promise((resolve, reject) => {
        const fileContent = fs.readFileSync(filePath);
  
        const params = {
          Bucket: bucketName,
          Key: keyName,
          Body: fileContent,
        };
  
        s3.upload(params, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data.Location);
          }
        });
      });
   };

   static downloadFile = (downloadPath, bucketName, keyName) => {
      const params = {
         Bucket: bucketName,
         Key: keyName,
      };

      const file = fs.createWriteStream(downloadPath);

      s3.getObject(params).createReadStream().pipe(file);

      file.on("close", () => {
         console.log("Arquivo baixado com sucesso:", downloadPath);
      });
   };
}

module.exports = awsRepository; 