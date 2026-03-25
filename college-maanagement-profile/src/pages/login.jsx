import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      formData
    );

    if (res.data.otpRequired) {
      alert("OTP sent to your email");
      navigate("/verify-otp", {
        state: { email: res.data.email }
      });
      return;
    }

  } catch (err) {
    console.error("Login error:", err);
    alert(err?.response?.data?.message || "Login failed");
  }
};

  return (
    <div className="login-page">
      <div className="login-overlay"></div>

      <div className="login-wrapper">
        <div className="login-left-panel">
          <h1>College Management Portal</h1>
          <p>
            Secure role-based platform for admin, professor, and student
            operations with assignments, tests, grades, attendance, and calendar.
          </p>

          <div className="login-feature-list">
            <div className="feature-chip">JWT Auth</div>
            <div className="feature-chip">2FA Login</div>
            <div className="feature-chip">Role Based Access</div>
            <div className="feature-chip">Assignments & Tests</div>
            <div className="feature-chip">Grades & Attendance</div>
          </div>
        </div>

        <div className="login-card">
          <h2>Welcome Back</h2>
          <p className="login-subtext">Sign in to continue</p>

          <form className="form-grid" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button className="btn-primary login-btn" type="submit">
              Continue to OTP
            </button>
          </form>

          <p className="forgot-text">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;