const AWS = require('aws-sdk');
const fs = require('fs')
const S3= require('aws-sdk/clients/s3')
const Keys = require('../keys')
const {AWS_BUCKET_REGION,AWS_BUCKET_NAME,AWS_ACCESS_KEY,AWS_SECRET_KEY} = Keys

const s3 = new S3({
  accessKeyId:AWS_ACCESS_KEY,
  secretAccessKey:AWS_SECRET_KEY
})

async function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)
   
    const uploadParams = {
      Bucket: AWS_BUCKET_NAME,
      Key: file.filename,
      Body: fileStream
    }
    s3.putObject(uploadParams).promise().then(
      function(data) {
        console.log("Successfully uploaded to " + AWS_BUCKET_NAME  );
    }).catch(
      function(err) {
        console.error(err, err.stack);
    });

  }
  exports.uploadFile = uploadFile



