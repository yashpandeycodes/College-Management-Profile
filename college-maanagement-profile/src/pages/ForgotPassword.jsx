import { useState } from "react";
import axios from "axios";
import api from "../api/axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(
        `/api/auth/forgot-password`,
        { email }
      );

      alert("Reset link generated");
      setEmail("");
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Error");
    }
  };

  return (
    <div className="simple-auth-page">
      <div className="simple-auth-card">
        <h2>Forgot Password</h2>
        <p className="login-subtext">Generate a password reset link</p>

        <form className="form-grid" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button className="btn-primary" type="submit">
            Generate Reset Link
          </button>
        </form>

      </div>
    </div>
  );
}

export default ForgotPassword;