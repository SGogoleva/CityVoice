// import { z } from 'zod';

// // Define the schema as shown above
// const MAX_UPLOAD_SIZE = 3 * 1024 * 1024; // 3MB max size
// const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg"];

// const imageSchema = z.object({
//   file: z
//     .instanceof(File)
//     .optional()
//     .refine((file) => {
//       return !file || file.size <= MAX_UPLOAD_SIZE;
//     }, "File size must be less than 3MB")
//     .refine((file) => {
//       return !file || ACCEPTED_FILE_TYPES.includes(file.type);
//     }, "File must be a PNG or JPEG"),
// });

// const validateFile = (file: File | undefined) => {
//   const result = imageSchema.safeParse({ file });
//   if (!result.success) {
//     console.error(result.error.errors);
//     return false;
//   }
//   return true;
// };

// // Example React component
// const FileUploadComponent = () => {
//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (validateFile(file)) {
//       console.log("File is valid");
//       // Proceed with file upload
//     } else {
//       console.error("File is invalid");
//     }
//   };

//   return (
//     <input type="file" accept=".png,.jpeg,.jpg" onChange={handleFileChange} />
//   );
// };

// export default FileUploadComponent;
