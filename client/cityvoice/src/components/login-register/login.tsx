import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { login, logout } from "../../store/slices/auth.slice";
import Input from "../single/input";
import Button from "../single/button";
import { RootState } from "../../store/store";
import {loginUser} from "../../types/userType"
import userData from "../../assets/users.json";
import { useEffect } from "react";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }, // will be used in UI
  } = useForm();
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.auth.isLoggedIn
  );
  const firstName = useAppSelector((state: RootState) => state.auth.firstName);

  useEffect(() => {
    if (isLoggedIn && firstName) {
        navigate('/home')
    }
  }, [isLoggedIn, firstName])

  const onSubmit: SubmitHandler<loginUser> = (data: {email: loginUser['email'], password: loginUser['passwordHash']}) => {
    dispatch(loginThunk(data)); //loginThunk and connection with slice auth
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
      <input type="password" placeholder="Password" {...register("Password", {required: true, min: 3})} />

      <input type="submit" />
    </form>
  );
};

export default LoginForm;



