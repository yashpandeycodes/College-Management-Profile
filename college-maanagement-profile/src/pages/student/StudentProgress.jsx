import { useContext, useEffect, useState } from "react";
import axios from "axios";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import { AuthContext } from "../../context/AuthProvider";

function StudentProgress() {
  const { token } = useContext(AuthContext);

  const [assignments, setAssignments] = useState([]);
  const [grades, setGrades] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const fetchAssignments = async () => {
    try {
      const res = await api.get(`/api/student/assignments`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAssignments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGrades = async () => {
    try {
      const res = await api.get(`/api/student/grades`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGrades(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAttendance = async () => {
    try {
      const res = await api.get(`/api/student/attendance`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAttendance(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAssignments();
      fetchGrades();
      fetchAttendance();
    }
  }, [token]);

  const avgMarks =
    grades.length > 0
      ? (grades.reduce((sum, g) => sum + (g.marks || 0), 0) / grades.length).toFixed(2)
      : 0;

  const avgAttendance =
    attendance.length > 0
      ? (attendance.reduce((sum, a) => sum + (a.percentage || 0), 0) / attendance.length).toFixed(2)
      : 0;

  return (
    <Layout>
      <h2 className="page-title">Progress Overview</h2>

      <div className="info-grid">
        <div className="stat-card">
          <h3>Total Assignments</h3>
          <p>{assignments.length}</p>
        </div>
        <div className="stat-card">
          <h3>Grades Recorded</h3>
          <p>{grades.length}</p>
        </div>
        <div className="stat-card">
          <h3>Attendance Records</h3>
          <p>{attendance.length}</p>
        </div>
        <div className="stat-card">
          <h3>Average Marks</h3>
          <p>{avgMarks}</p>
        </div>
        <div className="stat-card">
          <h3>Average Attendance</h3>
          <p>{avgAttendance}%</p>
        </div>
      </div>
    </Layout>
  );
}

export default StudentProgress;