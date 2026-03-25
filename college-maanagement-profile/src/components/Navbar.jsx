import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="brand-badge">CMS</div>
        <div>
          <h2 className="brand-title">College Management Portal</h2>
          <p className="brand-subtitle">Role Based Academic System</p>
        </div>
      </div>

      <div className="navbar-right">
        <div className="user-pill">
          <span className="user-email">{user?.email}</span>
          <span className="user-role">{user?.role}</span>
        </div>

        <button className="btn-primary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;