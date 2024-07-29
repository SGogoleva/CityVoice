import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { loginUser } from "../../types/userType";
import { useEffect } from "react";
import { loginThunk } from "../../store/thunks/auth.thunk";
import Button from "../single/button";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }, // will be used in UI
  } = useForm<loginUser>();
  const firstName = useAppSelector((state: RootState) => state.auth.firstName);
  const loginError = useAppSelector((state) => state.auth.error);
  const loading = useAppSelector((state) => state.auth.loading);

  useEffect(() => {
    if (firstName) {
      navigate("/");
    }
  }, [navigate, firstName]);

  const onSubmit: SubmitHandler<loginUser> = (data) => {
    dispatch(loginThunk(data)); //loginThunk and connection with slice auth
  };

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   dispatch(loginThunk({ email, password }));
  // };

  useEffect(() => {
    if (firstName) {
      window.location.reload(); // Reload the page after successful login
    }
  }, [firstName]);

  return (
    // <div className="max-w-md mx-auto mt-10 p-6 shadow-md rounded-lg">
    //   <form onSubmit={handleSubmit} className="mt-4 space-y-6">
    //   <div className="flex flex-col">
    // <label
    //   htmlFor="email"
    //   className="mb-1 text-sm font-semibold text-gray-700"
    // >
    //   Email
    // </label>
    //   <input
    //     type="email"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //     placeholder="Email"
    //     className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3E52]"
    //   />
    // </div>
    // <div className="flex flex-col">
    //   <label
    //     htmlFor="password"
    //     className="mb-1 text-sm font-semibold text-gray-700"
    //   >
    //     Password
    //   </label>
    //   <input
    //     type="password"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //     placeholder="Password"
    //     className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3E52]"
    //   />
    // </div>
    // <button className="mt-6 w-full bg-[#1F3E52] text-white py-2 px-4 rounded hover:bg-opacity-90 disabled:bg-gray-300">
    //   Sign in
    // </button>
    <div className="max-w-md mx-auto mt-10 mb-10 p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mb-4">
          <label
            htmlFor="numberID"
            className="mb-1 text-sm font-semibold text-gray-700"
          >
            Teudat Zehut
          </label>
          <input
            type="text"
            placeholder="Teudat Zehut"
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3E52]"
            {...register("numberID", {
              required: "Teudat Zehut is required",
              pattern: /^\d+$/,
            })}
          />
          {errors.numberID && (
            <p className="mt-1 text-sm text-red-600">{errors.numberID.message}</p>
          )}
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
            placeholder="Password"
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3E52]"
            {...register("password", {
              required: "Password is required",
              min: 3,
            })}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          variant="primary"
          size="fullWidth"
          className="mt-6"
          disabled={loading}
          loading={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
      {loginError && (
        <p className="mt-1 text-sm text-red-600">Invalid ID or Password</p>
      )}
      <h1 className="mt-4 text-center text-sm text-gray-600">
        Doesn't have an account yet?
      </h1>
      <Button
        variant="dim"
        size="fullWidth"
        className="mt-2"
        onClick={() => navigate("/register")}
      >
        Sign Up
      </Button>
    </div>
  );
};

export default LoginForm;
