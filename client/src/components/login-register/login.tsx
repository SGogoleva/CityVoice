"use client";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/slices/auth.slice";
import Button from "../single/button";
import { RootState } from "../../store/store";
import { loginUser } from "../../types/userType";
import userData from "../../assets/users.json";
import { useEffect, useState } from "react";
import { loginThunk } from "../../store/thunks/auth.thunk";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors }, // will be used in UI
  // } = useForm();
  const firstName = useAppSelector((state: RootState) => state.auth.firstName);

  useEffect(() => {
    if (firstName) {
      navigate("/");
    }
  }, [firstName]);

  // const onSubmit: SubmitHandler<loginUser> = (data: {email: string, password: string}) => {
  //   dispatch(loginThunk(data)); //loginThunk and connection with slice auth
  // };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginThunk({ email, password }));
  };
  useEffect(() => {
    if (firstName) {
      window.location.reload(); // Reload the page after successful login
    }
  }, [firstName]);
  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-md rounded-lg">
      <form onSubmit={handleSubmit} className="mt-4 space-y-6">
      <div className="flex flex-col">
      <label
        htmlFor="email"
        className="mb-1 text-sm font-semibold text-gray-700"
      >
        Email
      </label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3E52]"
      />
    </div>
    <div className="flex flex-col">
      <label
        htmlFor="password"
        className="mb-1 text-sm font-semibold text-gray-700"
      >
        Password
      </label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3E52]"
      />
    </div>
    <button className="mt-6 w-full bg-[#1F3E52] text-white py-2 px-4 rounded hover:bg-opacity-90 disabled:bg-gray-300">
      Sign in
    </button>
  </form>
  <h1 className="mt-4 text-center text-sm text-gray-600">
    Doesn't have an account yet?
  </h1>
  <button
    onClick={() => navigate("/register")}
    className="mt-2 w-full bg-gray-200 text-[#1F3E52] py-2 px-4 rounded hover:bg-gray-300"
  >
    Sign Up
  </button>
    </div>
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <input
    //     type="text"
    //     placeholder="Email"
    //     {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
    //   />
    //   <input
    //     type="password"
    //     placeholder="Password"
    //     {...register("Password", { required: true, min: 3 })}
    //   />

    //   <button>Submit</button>
    // </form>
  );
};

export default LoginForm;
