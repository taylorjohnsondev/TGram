import { useEffect } from "react";
import axios from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";

const GoogleSuccess = () => {
  const navigate = useNavigate();

  /**
   * This function fetches the authenticated Google user's data and stores it in local storage.
   */
  const fetchGoogleUser = async () => {
    const response = await axios
      .get("/auth/user", { withCredentials: true })
      .catch((err) => {
        console.log("Not properly authenticated.");
        console.log(err);
      });

    if (response && response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
  };

  useEffect(() => {
    fetchGoogleUser();

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    localStorage.setItem("token", JSON.stringify(token));

    const interval = setInterval(() => navigate("/"), 0.5);

    return () => clearInterval(interval);
  }, [navigate]);

  return <h1>Success ...redirecting.</h1>;
};

export default GoogleSuccess;
