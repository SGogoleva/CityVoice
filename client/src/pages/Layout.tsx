import { Outlet, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { checkAuthThunk } from "../store/thunks/auth.thunk";
import LogoutButton from "../components/login-register/logout";

const Layout = () => {
  const dispatch = useAppDispatch();
  const firstName = useAppSelector((state) => state.auth.firstName);
  const isAuthenticated = useAppSelector(
    (state) => state.isAuth.isAuthenticated
  );
  useEffect(() => {
    dispatch(checkAuthThunk());
  }, [dispatch]);
  console.log(isAuthenticated)
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Main</Link>
          </li>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
          <li>
            {/* <Link to={firstName ? "/personal" : "/login"}>
              {firstName ? "Personal Page" : "Login / Register"}
            </Link> */}
            {isAuthenticated ? (
              <>
                <Link to="/personal">Personal Page</Link>
                <LogoutButton />
              </>
            ) : (
              <Link to="/login">Login / Register</Link>
            )}
          </li>
          {/* {firstName && (
            <li>
              <LogoutButton />
            </li>
          )} */}
          <li>
            <Link to="/send-messasge">Send Message</Link>
          </li>
        </ul>
      </nav>
      {firstName && (
        <div>
          <p>Welcome, {firstName}!</p>
        </div>
      )}
{/* import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}; */}

export default Layout;
