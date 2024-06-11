import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { registerUser } from "../../types/userType";
import { registerUserThunk } from "../../store/thunks/reg.thunk";
import { useForm, SubmitHandler } from "react-hook-form";
import { getCities } from "../../http";
import { City } from "../../types/cities";

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
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const [cities, setCities] = useState<City[]>([]);

  const fetchCities = async () => {
    try {
      const citiesData: City[] = await getCities();
      setCities(citiesData);
    } catch (error) {
      console.error("There was an error fetching the cities!", error);
    }
  };

  if (cities.length === 0) {
    fetchCities();
  }

  // useEffect(() => {
  //   const fetchCities = async () => {
  //     try {
  //       const citiesData: City[] = await getCities();
  //       setCities(citiesData);
  //     } catch (error) {
  //       console.error('There was an error fetching the cities!', error);
  //     }
  //   };

  //   fetchCities();
  // }, []);

  useEffect(() => {
    if (user) {
      navigate("/login");
    }
  }, [user]);

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCityId = event.target.value;
    const selectedCityName = event.target.options[event.target.selectedIndex].text;
    setValue('cityId', selectedCityId);
    setValue('cityName', selectedCityName);
  };
  const onSubmit: SubmitHandler<FormData> = (data) => {
    const userData: registerUser = {
      name: {
        firstName: data.firstName,
        lastName: data.lastName,
      },
      DOB: data.DOB,
      phone: data.phone,
      email: data.email,
      password: data.password,
      city: {
        cityId: data.cityId,
        cityName: data.cityName,
      },
    };
    dispatch(registerUserThunk(userData));
  };

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>First Name</label>
        <input
          type="text"
          {...register("firstName", {
            required: "First name is required",
            minLength: { value: 3, message: "Minimum length is 3" },
            maxLength: { value: 80, message: "Maximum length is 80" },
          })}
        />
        {errors.firstName && <p>{errors.firstName.message}</p>}
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          {...register("lastName", {
            required: "Last name is required",
            minLength: { value: 5, message: "Minimum length is 5" },
            maxLength: { value: 100, message: "Maximum length is 100" },
          })}
        />
        {errors.lastName && <p>{errors.lastName.message}</p>}
      </div>
      <div>
        <label>Date of Birth</label>
        <input
          type="date"
          {...register("DOB", { required: "Date of birth is required" })}
        />
        {errors.DOB && <p>{errors.DOB.message}</p>}
      </div>
      <div>
        <label>Phone</label>
        <input
          type="text"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Phone number must be 10 digits",
            },
          })}
        />
        {errors.phone && <p>{errors.phone.message}</p>}
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Minimum length is 6" },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <select {...register("cityId", { required: true })} onChange={handleCityChange}>
        <option value="">Select a city</option>
        {cities.map(city => (
          <option key={city.cityId} value={city.cityId}>{city.cityName}</option>
        ))}
      </select>
      {errors.cityId && <p>{errors.cityId.message}</p>}
      <input type="hidden" {...register("cityName")} />
      {/* <div>
        <label>City ID</label>
        <input
          type="text"
          {...register("cityId", { required: "City ID is required" })}
        />
        {errors.cityId && <p>{errors.cityId.message}</p>}
      </div>
      <div>
        <label>City Name</label>
        <input
          type="text"
          {...register("cityName", { required: "City name is required" })}
        />
        {errors.cityName && <p>{errors.cityName.message}</p>}
      </div> */}
      <button type="submit">Register</button>
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
