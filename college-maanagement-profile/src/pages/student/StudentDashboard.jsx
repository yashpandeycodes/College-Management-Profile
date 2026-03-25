import Layout from "../../components/Layout";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

function StudentDashboard() {
  const { user } = useContext(AuthContext);

  return (
    <Layout>
      <h2 className="page-title">Student Dashboard</h2>

      <div className="info-grid">
        <div className="stat-card">
          <h3>Welcome</h3>
          <p>{user?.email}</p>
        </div>
        <div className="stat-card">
          <h3>Role</h3>
          <p>{user?.role}</p>
        </div>
      </div>

      <div className="card">
        <p>Use the sidebar to view assignments, tests, grades, attendance, calendar, and progress.</p>
      </div>
    </Layout>
  );
}

export default StudentDashboard;