import { useContext, useEffect, useState } from "react";
import axios from "axios";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import { AuthContext } from "../../context/AuthProvider";

function ProfessorAttendance() {
  const { token } = useContext(AuthContext);

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [attendanceData, setAttendanceData] = useState({
    student: "",
    course: "",
    percentage: ""
  });

  const fetchStudents = async () => {
    try {
      const res = await api.get(`/api/professor/students`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await api.get(`/api/professor/courses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchStudents();
      fetchCourses();
    }
  }, [token]);

  const handleAttendanceChange = (e) => {
    setAttendanceData({
      ...attendanceData,
      [e.target.name]: e.target.value
    });
  };

  const handleUploadAttendance = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/api/professor/attendance`, attendanceData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setAttendanceData({
        student: "",
        course: "",
        percentage: ""
      });

      alert("Attendance uploaded successfully");
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Failed to upload attendance");
    }
  };

  return (
    <Layout>
      <h2 className="page-title">Attendance</h2>

      <div className="card">
        <h3>Upload Attendance</h3>
        <form className="form-grid" onSubmit={handleUploadAttendance}>
          <select name="student" value={attendanceData.student} onChange={handleAttendanceChange} required>
            <option value="">Select Student</option>
            {students.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name} ({s.email})
              </option>
            ))}
          </select>

          <select name="course" value={attendanceData.course} onChange={handleAttendanceChange} required>
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title} ({c.code})
              </option>
            ))}
          </select>

          <input type="number" name="percentage" placeholder="Enter Attendance %" value={attendanceData.percentage} onChange={handleAttendanceChange} required />
          <button className="btn-primary" type="submit">Upload Attendance</button>
        </form>
      </div>
    </Layout>
  );
}

export default ProfessorAttendance;