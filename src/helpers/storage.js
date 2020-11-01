const { Storage } = require("@google-cloud/storage");
const { format } = require("util");
const path = require("path");
const serviceKey = path.join(__dirname, "../../bucket-key.json");

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: process.env.GCLOUD_PROJECT_ID,
});


const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

const uploadFile = async (newFilename, file, folder, callback) => {
  const blob = bucket.file(
    `${folder}/${newFilename}.${file.originalname.split(".").pop()}`
  );
  const blobStream = blob.createWriteStream();

  blobStream.on("error", (err) => {
    throw Error(err);
  });

  blobStream.on("finish", () => {
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );

    callback(publicUrl);
  });

  blobStream.end(file.buffer);
};

module.exports = uploadFile;
