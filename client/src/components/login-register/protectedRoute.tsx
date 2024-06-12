import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Navigate } from "react-router";
import { Outlet } from "react-router-dom";
import { isAuth } from "../../http";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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

  useEffect(() => {
    dispatch(checkAuthThunk());
  }, []);

  if (!isAuthenticated) {
    <Navigate to={redirectPath} />;
  }

  return children;
}

export default ProtectedRoute;
