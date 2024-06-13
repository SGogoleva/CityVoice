import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Navigate } from "react-router";
import { useEffect } from "react";
import { checkAuthThunk } from "../../store/thunks/auth.thunk";

type ProtectedRouteProps = {
  children: JSX.Element;
  redirectPath: string;
};

function ProtectedRoute({ children, redirectPath }: ProtectedRouteProps) {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(
    (state) => state.isAuth.isAuthenticated
  );

  if (isAuthenticated === false) {
    <Navigate to={redirectPath} />;
  }

  useEffect(() => {
    dispatch(checkAuthThunk());
  }, [dispatch]);
  console.log(isAuthenticated);

  return children;
}

export default ProtectedRoute;
