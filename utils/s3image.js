const { S3 } = require("aws-sdk");
const { uuid } = require("uuidv4");

exports.s3Uploadv2 = async (files) => {
  const s3 = new S3({
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    Bucket: config.AWS_BUCKET_NAME,
  });

  const params = files.map((file) => {
    return {
      Bucket: config.AWS_BUCKET_NAME,
      Key: `public/images/${uuid()}-${file.originalname}`,
      Body: file.buffer,
    };
  });

  const results = await Promise.all(
    params.map((param) => s3.upload(param).promise())
  );
  return results;
};
