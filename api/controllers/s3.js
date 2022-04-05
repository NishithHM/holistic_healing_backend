const AWS = require('aws-sdk');
const fs = require('fs')
require('dotenv').config();

const region = process.env.AWS_BUCKET_REGION;
const bucketName= process.env.AWS_BUCKET_NAME;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretKey = process.env.AWS_SECRET_KEY;

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
        console.error(err, err.stack);
    });

  }
  exports.uploadFile = uploadFile



