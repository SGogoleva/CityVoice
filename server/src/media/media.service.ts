import cloudinary from "../config/cloudinaryConfig";
import {
  CloudinaryUploadError,
  CloudinaryUploadResult,
  UploadFile,
} from "../types/files";

const uploadImage = ({
  buffer,
  originalname,
}: UploadFile): Promise<CloudinaryUploadResult> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { use_filename: true, public_id: originalname.split(".")[0] },
        (
          error: CloudinaryUploadError | undefined,
          result: CloudinaryUploadResult | undefined
        ) => {
          if (error) {
            reject(error);
          } else if (result) {
            resolve(result);
          } else {
            reject(new Error("Upload failed with an unknown error"));
          }
        }
      )
      .end(buffer);
  });
};

export default uploadImage;
