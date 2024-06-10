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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button>submit</button>
      </form>
      <h1>Doesn't have an account yet?</h1>
      <button onClick={() => navigate("/register")}>Sign Up</button>
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
