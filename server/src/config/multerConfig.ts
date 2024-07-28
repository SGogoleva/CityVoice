import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });
export const uploadMessageImages = multer({
  storage: storage,
  limits: { files: 3 },
});

export default upload;
