import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        { newPassword }
      );

      alert("Password reset successful");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Error");
    }
  };

  return (
    <div className="simple-auth-page">
      <div className="simple-auth-card">
        <h2>Reset Password</h2>
        <p className="login-subtext">Choose a new secure password</p>

        <form className="form-grid" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <button className="btn-primary" type="submit">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;