import { Outlet, Link } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const Layout = () => {
  const firstName = useAppSelector((state) => state.auth.firstName);
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
            <Link to={firstName ? "/personal" : "/login"}>
              {firstName ? "Personal Page" : "Login / Register"}
            </Link>
          </li>
        </ul>
      </nav>
      {firstName && (
        <div>
          <p>Welcome, {firstName}!</p>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default Layout;
