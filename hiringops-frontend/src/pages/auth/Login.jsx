import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, loadUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  const dispatch = useDispatch();

  const { loading, error, user, accessToken } = useSelector(
    (state) => state.auth,
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(loginUser(formData));

    if (result.meta.requestStatus === "fulfilled") {
      dispatch(loadUser());
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin");
    }

    if (user?.role === "recruiter") {
      navigate("/recruiter");
    }

    if (user?.role === "candidate") {
      navigate("/candidate");
    }
  }, [user, accessToken, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-zinc-900 p-8 rounded-xl w-[400px]">
        <h1 className="text-3xl font-bold mb-6">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded bg-zinc-800 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded bg-zinc-800 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-semibold"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {user && <div className="mt-4 text-green-500">Welcome {user.name}</div>}
      </div>
    </div>
  );
}

export default Login;
