import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "../redux/store/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");

    if (code) {
      login(code);
    }
  }, [location]);

  const login = async (code: string) => {
    try {
      // Replace with your backend auth endpoint
      console.log("Request code sending...");
      const response = await axios.get(
        `https://getpaidtocheat-backend.onrender.com/api/auth/discord/redirect?code=${code}`
      );

      console.log("data recevied!");
      const data = response.data.data;

      // Log the received data
      console.log("Discord Login Response:", response.data);

      // Store tokens in localStorage
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);

      // Dispatch user data to Redux
      dispatch(setUser(data.user));

      navigate('/dashboard');
    } catch (error) {
      console.error("Error during Discord login:", error);
    }
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <p className="text-6xl font-bold text-black">Logging in...</p>
      </div>
    </>
  )
};

export default Login;
