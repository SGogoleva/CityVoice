import cloudinary from "../config/cloudinaryConfig";
import { UploadFile } from "../types/files";

const uploadImage = ({ buffer, originalname }: UploadFile) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { use_filename: true, public_id: originalname.split(".")[0] },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      )
      .end(buffer);
  });
};

export default uploadImage
