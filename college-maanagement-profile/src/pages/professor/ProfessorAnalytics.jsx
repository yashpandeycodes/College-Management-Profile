import { useContext, useEffect, useState } from "react";
import axios from "axios";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import { AuthContext } from "../../context/AuthProvider";

function ProfessorAnalytics() {
  const { token } = useContext(AuthContext);
  const [analytics, setAnalytics] = useState(null);

  const fetchAnalytics = async () => {
    try {
      const res = await api.get(`/api/professor/analytics`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAnalytics(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) fetchAnalytics();
  }, [token]);

  return (
    <Layout>
      <h2 className="page-title">Analytics</h2>

      {analytics && (
        <div className="info-grid">
          <div className="stat-card">
            <h3>Total Students</h3>
            <p>{analytics.totalStudents}</p>
          </div>
          <div className="stat-card">
            <h3>Total Submissions</h3>
            <p>{analytics.totalSubmissions}</p>
          </div>
          <div className="stat-card">
            <h3>Average Marks</h3>
            <p>{analytics.avgMarks}</p>
          </div>
          <div className="stat-card">
            <h3>Average Attendance</h3>
            <p>{analytics.avgAttendance}%</p>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default ProfessorAnalytics;