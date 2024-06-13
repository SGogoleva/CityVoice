import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import { logoutThunk } from "../../store/thunks/auth.thunk";

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
  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
