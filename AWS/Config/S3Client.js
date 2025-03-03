const AWS = require('aws-sdk');


AWS.config.update({
  region: 'us-east-1',
  accessKeyId: 'BnFIon8Yr5tE6DSSeYWc4jnTQ7GRbeBU5taRj0Pv',
  secretAccessKey: 'AKIA5RRHCKYZTUINUDUY',
});

const s3 = new AWS.S3();

module.exports = s3;