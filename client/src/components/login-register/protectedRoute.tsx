import { useAppSelector } from "../../store/hooks";
import { Navigate } from "react-router";
import { Outlet } from "react-router-dom";

type ProtectedRouteProps = {
  children: JSX.Element;
  redirectPath: string;
};

function ProtectedRoute({ children, redirectPath }: ProtectedRouteProps) {
  const firstName = useAppSelector((state) => state.auth.firstName);

  if (!firstName) return <Navigate to={redirectPath} />;

  return children;
}

export default ProtectedRoute;
