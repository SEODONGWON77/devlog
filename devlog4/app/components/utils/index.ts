import AWS from "aws-sdk";

const ACCESS_KEY = process.env.NEXT_PUBLIC_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY;
const REGION = process.env.NEXT_PUBLIC_REGION;
const S3_BUCKET = process.env.NEXT_PUBLIC_S3_BUCKET;

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

export const uploadFile = async (file: File, fileName: string) => {
  const params = {
    ACL: "public-read",
    Body: file,
    Bucket: S3_BUCKET,
    Key: "upload/" + `${fileName}`,
  };
  return await myBucket
    .upload(params)
    .promise()
    .then((res) => {
      return res;
    });
};
