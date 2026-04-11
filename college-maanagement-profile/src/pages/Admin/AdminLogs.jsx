import { useContext, useEffect, useState } from "react";
import axios from "axios";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import { AuthContext } from "../../context/AuthProvider";

function AdminLogs() {
  const { token } = useContext(AuthContext);
  const [loginLogs, setLoginLogs] = useState([]);

  const fetchLoginLogs = async () => {
    try {
      const res = await api.get(`/api/admin/login-logs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLoginLogs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) fetchLoginLogs();
  }, [token]);

  return (
    <Layout>
      <h2 className="page-title">Login Logs</h2>

      <div className="card">
        {loginLogs.length === 0 ? (
          <p>No login logs available</p>
        ) : (
          loginLogs.map((log) => (
            <div key={log._id} className="item-card">
              <p><strong>Email:</strong> {log.email}</p>
              <p><strong>Role:</strong> {log.role}</p>
              <p><strong>Login Time:</strong> {log.loginTime ? log.loginTime.slice(0, 19).replace("T", " ") : ""}</p>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}

export default AdminLogs;