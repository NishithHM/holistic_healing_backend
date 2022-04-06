const AWS = require('aws-sdk');
const fs = require('fs')
require('dotenv').config();
/* 
Access Key ID:
AKIAVQ2J72GQU4W2YBNP
Secret Access Key:
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
*/
const region = process.env.AWS_BUCKET_REGION || 'ap-south-1';
const bucketName= process.env.AWS_BUCKET_NAME || 'holistichealing';
const accessKey = process.env.AWS_ACCESS_KEY || 'AKIAVQ2J72GQU4W2YBNP';
const secretKey = process.env.AWS_SECRET_KEY || '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';

const s3 = new AWS.S3({
    region,
    aws_access_key_id :accessKey,
    aws_secret_access_key :secretKey
})

async function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)
    const uploadParams = {
      Bucket: bucketName,
      Key: file.filename,
      Body: fileStream
     
    }
    s3.putObject(uploadParams).promise().then(
      function(data) {
        console.log("Successfully uploaded to " + bucketName + "/" + key);
    }).catch(
      function(err) {
        console.error(err, err.stack, 'jere');
    });

  }
  exports.uploadFile = uploadFile



