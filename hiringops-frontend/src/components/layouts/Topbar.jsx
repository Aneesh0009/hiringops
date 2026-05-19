import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/auth/authSlice";
import { setAccessToken } from "../../api/axios";

const Topbar = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAccessToken(null);
    dispatch(logoutUser());
    navigate("/");
  };
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <div className="flex items-center gap-4">
        <span className="font-medium">{user?.fullName ?? user?.name ?? user?.email}</span>

        <div
          className="w-10 h-10 rounded-full bg-gray-300 cursor-pointer"
          onClick={handleLogout}
          role="button"
          aria-label="Logout"
        />
      </div>
    </header>
  );
};

export default Topbar;
