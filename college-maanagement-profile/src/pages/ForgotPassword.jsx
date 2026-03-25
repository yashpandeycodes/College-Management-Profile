import { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [resetLink, setResetLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );

      setResetLink(res.data.resetLink);
      alert("Reset link generated");
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

        {resetLink && (
          <div className="card" style={{ marginTop: "16px" }}>
            <p><strong>Reset Link:</strong></p>
            <a href={resetLink}>{resetLink}</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;