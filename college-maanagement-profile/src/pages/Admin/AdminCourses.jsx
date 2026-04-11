import { useContext, useEffect, useState } from "react";
import axios from "axios";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import { AuthContext } from "../../context/AuthProvider";

function AdminCourses() {
  const { token } = useContext(AuthContext);

  const [courses, setCourses] = useState([]);
  const [courseData, setCourseData] = useState({
    title: "",
    code: ""
  });

  const fetchCourses = async () => {
    try {
      const res = await api.get(`/api/admin/courses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) fetchCourses();
  }, [token]);

  const handleCourseChange = (e) => {
    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/api/admin/courses`, courseData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setCourseData({ title: "", code: "" });
      fetchCourses();
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Failed to add course");
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await api.delete(`/api/admin/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCourses();
    } catch (error) {
      console.log(error);
      alert("Failed to delete course");
    }
  };

  return (
    <Layout>
      <h2 className="page-title">Courses</h2>

      <div className="card">
        <h3>Add Course</h3>
        <form className="form-grid" onSubmit={handleAddCourse}>
          <input name="title" placeholder="Course Title" value={courseData.title} onChange={handleCourseChange} required />
          <input name="code" placeholder="Course Code" value={courseData.code} onChange={handleCourseChange} required />
          <button className="btn-primary" type="submit">Add Course</button>
        </form>
      </div>

      <div className="card">
        <h3>All Courses</h3>
        {courses.length === 0 ? (
          <p>No courses found</p>
        ) : (
          courses.map((c) => (
            <div key={c._id} className="item-card">
              <p><strong>Title:</strong> {c.title}</p>
              <p><strong>Code:</strong> {c.code}</p>
              <button className="btn-danger" onClick={() => handleDeleteCourse(c._id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}

export default AdminCourses;