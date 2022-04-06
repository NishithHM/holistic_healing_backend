const AWS = require('aws-sdk');
const fs = require('fs')
const S3= require('aws-sdk/clients/s3')
require('dotenv').config();

const region = process.env.AWS_BUCKET_REGION;
const bucketName= process.env.AWS_BUCKET_NAME;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretKey = process.env.AWS_SECRET_KEY;
//console.log(region)

const s3 = new S3({

})

async function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)
   
    const uploadParams = {
      Bucket: "holistichealing",
      Key: file.filename,
      Body: fileStream
     
    }
    s3.putObject(uploadParams).promise().then(
      function(data) {
        console.log("Successfully uploaded to " + "sd" + "/" );
    }).catch(
      function(err) {
        console.error(err, err.stack);
    });

  }
  exports.uploadFile = uploadFile



