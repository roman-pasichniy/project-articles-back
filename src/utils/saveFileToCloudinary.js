import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getMissingCloudinaryVars = () => {
  const requiredVars = [
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
  ];

  return requiredVars.filter((envVar) => !process.env[envVar]);
};

export async function saveFileToCloudinary(buffer, options = {}) {
  const missingVars = getMissingCloudinaryVars();

  if (missingVars.length > 0) {
    throw new Error(
      `Cloudinary env is not configured. Missing: ${missingVars.join(", ")}`
    );
  }

  const uploadOptions = {
    resource_type: "image",
    folder: options.folder,
    public_id: options.publicId,
    overwrite: options.overwrite ?? false,
    unique_filename: options.uniqueFilename ?? true,
  };

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      }
    );

    uploadStream.end(buffer);
  });
}