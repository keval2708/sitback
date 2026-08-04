import AWS from "aws-sdk";

// Config
export const S3_CONFIG = {
  S3_BUCKET: process.env.S3_BUCKET,
  S3_REGION: process.env.S3_REGION,
  S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
  S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
  S3_VIDEO_FOLDER: process.env.S3_VIDEO_FOLDER,
};

const s3 = new AWS.S3({
  secretAccessKey: S3_CONFIG.S3_SECRET_ACCESS_KEY,
  accessKeyId: S3_CONFIG.S3_ACCESS_KEY_ID,
  region: S3_CONFIG.S3_REGION,
  httpOptions: {
    timeout: 3600000,
  },
});

export const uploadFile = (params, options, callback) =>
  new Promise((resolve, reject) => {
    try {
      s3.upload(params, options, async (err, data) => {
        if (err) return reject({ status: false, err: err, url: null });
        return resolve({
          status: true,
          err: null,
          data,
        });
      }).on("httpUploadProgress", (progressEvent) => {
        const uploadedBytes = progressEvent.loaded;
        const totalBytes = progressEvent.total;
        const percent = (uploadedBytes / totalBytes) * 100;
        callback(Math.round(percent));
      });
    } catch (error) {
      reject({ status: false, err: error, url: null });
    }
  });

export const deleteFile = (params) =>
  new Promise((resolve, reject) => {
    try {
      s3.deleteObject(params, async (err, data) => {
        if (err) return reject({ status: false, err: err, url: null });
        return resolve({
          status: true,
          err: null,
          data,
        });
      });
    } catch (error) {
      reject({ status: false, err: error, url: null });
    }
  });

export const getFile = (params) =>
  new Promise((resolve, reject) => {
    try {
      s3.getObject(params, (err, data) => {
        if (err) return reject({ status: false, err: err, url: null });
        return resolve({
          status: true,
          err: null,
          data,
        });
      });
    } catch (error) {}
  });
