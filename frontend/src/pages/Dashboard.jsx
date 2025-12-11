import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [timeLeft, setTimeLeft] = useState(20);
  const [loading, setLoading] = useState(false);
  const { updateAccessToken, clearAccessToken } = useAuth();
  const navigate = useNavigate();

  async function hitApi() {
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/refresh",
        {},
        { withCredentials: true }
      );

      updateAccessToken(response.data.accessToken);
    } catch (error) {
      if (error.response?.data === "logout") {
        clearAccessToken();
        navigate("/login");
      }
    }

    setLoading(false);
    setTimeLeft(20);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      Promise.resolve().then(() => hitApi());
    }
  }, [timeLeft]);

  return (
    <div className="text-2xl">
      {loading ? "Loading..." : `Next API call in: ${timeLeft}s`}
      <button className="px-2 py-2 bg-blue-700 rounded-2xl text-white ml-10 mt-5" onClick={() => navigate("/todos")}>Check Todo</button>
    </div>
  );
};

export default Dashboard;
