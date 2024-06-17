import LoginForm from "../components/login-register/login";

const LoginPage = () => {
  return (
    <>
      <div className="container mt-4 text-sm min-h-screen">
        <h1 className="sr-only">Login Page</h1>
        <LoginForm />
      </div>
    </>
  );
};

export default LoginPage;
