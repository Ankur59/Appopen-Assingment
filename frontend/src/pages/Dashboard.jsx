import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [timeLeft, setTimeLeft] = useState(20);
  const [loading, setLoading] = useState(false);
  const { updateAccessToken, clearAccessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      hitApi();
    }
  }, [timeLeft]);

  const hitApi = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/refresh",
        {},
        {
          withCredentials: true,
        }
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
  };
  console.log("ajsdasdasd");
  return (
    <div className="text-2xl bg-red-700">
      {loading ? "Loading..." : `Next API call in: ${timeLeft}s`}
      <span>jhjjjjjdjdfhf</span>
    </div>
  );
};

export default Dashboard;
