const AWS = require('aws-sdk');


AWS.config.update({
  region: 'us-east-1',
  accessKeyId: 'B328mo5Ry6IdLvxxgXeeHAElPfR8U/wx/b3lbljs',
  secretAccessKey: 'AKIA5RRHCKYZSZDVDH77',
});

const s3 = new AWS.S3();

module.exports = s3;