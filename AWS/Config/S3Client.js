const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-',
  accessKeyId: 'B328mo5Ry6IdLvxxgXeeHAEPfR8U/wx/b31b1js',
  secretAccessKey: 'AKIA5RRHCKYZSZDVDH77',
});

const s3 = new AWS.S3();

module.exports = s3;