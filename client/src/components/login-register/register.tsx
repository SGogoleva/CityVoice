import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { registerUser } from "../../types/userType";
import { registerUserThunk } from "../../store/thunks/reg.thunk";
import { useForm, SubmitHandler } from "react-hook-form";

type FormData = {
  firstName: string;
  lastName: string;
  DOB: string;
  phone: string;
  email: string;
  password: string;
  cityId: string;
  cityName: string;
};

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.reg.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      navigate("login");
    }
  }, [user]);

  const onSubmit: SubmitHandler<registerUser> = (data: {
    name: { firstName: string; lastName: string };
    DOB: string;
    phone: string;
    email: string;
    password: string;
    city: {
      cityId: string;
      cityName: string;
    };
  }) => {
    dispatch(registerUserThunk(data));
  };

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="First name"
        {...register("firstName", { required: true, min: 3, maxLength: 80 })}
      />
      <input
        type="text"
        placeholder="Last name"
        {...register("lastname", { required: true, min: 5, maxLength: 100 })}
      />
      <input type="text" placeholder="DOB" {...register("DOB", {})} />
      <input
        type="number"
        placeholder="phone"
        {...register("phone", {
          required: true,
          max: 10,
          min: 10,
          maxLength: 10,
        })}
      />
      <input
        type="email"
        placeholder="email"
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
      />
      <input
        type="password"
        placeholder="password"
        {...register("password", {})}
      />
      <input type="text" placeholder="cityId" {...register("cityId", {})} />
      <input type="text" placeholder="cityName" {...register("cityName", {})} />

      <input type="submit" />
    </form>
  );
};

export default RegisterForm;
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
