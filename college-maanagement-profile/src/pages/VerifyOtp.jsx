import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";

function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser, setToken } = useContext(AuthContext);

  const [otp, setOtp] = useState("");
  const email = location.state?.email || "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        {
          email,
          otp
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setToken(res.data.token);
      setUser(res.data.user);

      if (res.data.user.role === "admin") navigate("/admin");
      else if (res.data.user.role === "professor") navigate("/professor");
      else navigate("/student");
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="simple-auth-page">
      <div className="simple-auth-card">
        <h2>Verify OTP</h2>
        <p className="login-subtext">Email: {email}</p>

        <form className="form-grid" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <button className="btn-primary" type="submit">
            Verify and Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOtp;