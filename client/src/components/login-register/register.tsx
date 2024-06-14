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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-6">
    <div className="flex flex-col">
      <label htmlFor="firstName" className="mb-1 text-sm font-semibold text-gray-700">
        First Name
      </label>
      <input
        type="text"
        {...register("firstName", {
          required: "First name is required",
          minLength: { value: 3, message: "Minimum length is 3" },
          maxLength: { value: 80, message: "Maximum length is 80" },
        })}
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3E52]"
        placeholder="First Name"
      />
      {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>}
    </div>

    <div className="flex flex-col">
      <label htmlFor="lastName" className="mb-1 text-sm font-semibold text-gray-700">
        Last Name
      </label>
      <input
        type="text"
        {...register("lastName", {
          required: "Last name is required",
          minLength: { value: 5, message: "Minimum length is 5" },
          maxLength: { value: 100, message: "Maximum length is 100" },
        })}
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3E52]"
        placeholder="Last Name"
      />
      {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
    </div>

    <div className="flex flex-col">
      <label htmlFor="DOB" className="mb-1 text-sm font-semibold text-gray-700">
        Date of Birth
      </label>
      <input
        type="date"
        {...register("DOB", { required: "Date of birth is required" })}
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3E52]"
      />
      {errors.DOB && <p className="mt-1 text-sm text-red-600">{errors.DOB.message}</p>}
    </div>

    <div className="flex flex-col">
      <label htmlFor="phone" className="mb-1 text-sm font-semibold text-gray-700">
        Phone
      </label>
      <input
        type="text"
        {...register("phone", {
          required: "Phone number is required",
          pattern: {
            value: /^[0-9]{10}$/,
            message: "Phone number must be 10 digits",
          },
        })}
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3E52]"
        placeholder="Phone"
      />
      {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
    </div>

    <div className="flex flex-col">
      <label htmlFor="email" className="mb-1 text-sm font-semibold text-gray-700">
        Email
      </label>
      <input
        type="email"
        {...register("email", {
          required: "Email is required",
          pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
        })}
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3E52]"
        placeholder="Email"
      />
      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
    </div>

    <div className="flex flex-col">
      <label htmlFor="password" className="mb-1 text-sm font-semibold text-gray-700">
        Password
      </label>
      <input
        type="password"
        {...register("password", {
          required: "Password is required",
          minLength: { value: 6, message: "Minimum length is 6" },
        })}
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3E52]"
        placeholder="Password"
      />
      {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
    </div>

    <div className="flex flex-col">
      <label htmlFor="cityId" className="mb-1 text-sm font-semibold text-gray-700">
        City
      </label>
      <select
        {...register("cityId", { required: true })}
        onChange={handleCityChange}
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3E52]"
      >
        <option value="">Select a city</option>
        {cities.map((city) => (
          <option key={city.cityId} value={city.cityId}>
            {city.cityName}
          </option>
        ))}
      </select>
      {errors.cityId && <p className="mt-1 text-sm text-red-600">{errors.cityId.message}</p>}
    </div>

    <button
      type="submit"
      className="mt-6 w-full bg-[#1F3E52] text-white py-2 px-4 rounded hover:bg-opacity-90 disabled:bg-gray-300"
    >
      Register
    </button>
  </form>
    </div>
  );
};

export default RegisterForm;