import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import { logoutThunk } from "../../store/thunks/auth.thunk";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";

const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await dispatch(logoutThunk()).unwrap();
    navigate("/login");
    if (result === false) {
      window.location.reload();
    }
  };
  return <ArrowRightStartOnRectangleIcon onClick={handleLogout} className="h-6 w-6" title="Logout"/>;
};

export default LogoutButton;
