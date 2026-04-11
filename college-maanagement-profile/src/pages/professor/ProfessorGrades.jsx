import { useContext, useEffect, useState } from "react";
import axios from "axios";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import { AuthContext } from "../../context/AuthProvider";

function ProfessorGrades() {
  const { token } = useContext(AuthContext);

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [gradeData, setGradeData] = useState({
    student: "",
    course: "",
    marks: ""
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

  const handleGradeChange = (e) => {
    setGradeData({
      ...gradeData,
      [e.target.name]: e.target.value
    });
  };

  const handleUploadGrade = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/api/professor/grades`, gradeData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setGradeData({
        student: "",
        course: "",
        marks: ""
      });

      alert("Grade uploaded successfully");
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Failed to upload grade");
    }
  };

  return (
    <Layout>
      <h2 className="page-title">Grades</h2>

      <div className="card">
        <h3>Upload Grade</h3>
        <form className="form-grid" onSubmit={handleUploadGrade}>
          <select name="student" value={gradeData.student} onChange={handleGradeChange} required>
            <option value="">Select Student</option>
            {students.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name} ({s.email})
              </option>
            ))}
          </select>

          <select name="course" value={gradeData.course} onChange={handleGradeChange} required>
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title} ({c.code})
              </option>
            ))}
          </select>

          <input type="number" name="marks" placeholder="Enter Marks" value={gradeData.marks} onChange={handleGradeChange} required />
          <button className="btn-primary" type="submit">Upload Grade</button>
        </form>
      </div>
    </Layout>
  );
}

export default ProfessorGrades;