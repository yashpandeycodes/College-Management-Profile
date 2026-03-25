import Layout from "../../components/Layout";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

function ProfessorDashboard() {
  const { user } = useContext(AuthContext);

  return (
    <Layout>
      <h2 className="page-title">Professor Dashboard</h2>

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
        <p>Use the sidebar to manage assignments, tests, submissions, grades, attendance, and analytics.</p>
      </div>
    </Layout>
  );
}

export default ProfessorDashboard;