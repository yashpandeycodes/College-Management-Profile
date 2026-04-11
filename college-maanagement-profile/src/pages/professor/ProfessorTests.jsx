import { useContext, useEffect, useState } from "react";
import axios from "axios";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import { AuthContext } from "../../context/AuthProvider";

function ProfessorTests() {
  const { token } = useContext(AuthContext);

  const [tests, setTests] = useState([]);
  const [courses, setCourses] = useState([]);
  const [testData, setTestData] = useState({
    title: "",
    course: "",
    maxMarks: "",
    dueDate: ""
  });

  const fetchTests = async () => {
    try {
      const res = await api.get(`/api/professor/tests`);
      setTests(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await api.get(`/api/professor/courses`);
      setCourses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTests();
      fetchCourses();
    }
  }, [token]);

  const handleTestChange = (e) => {
    setTestData({
      ...testData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddTest = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/api/professor/tests`, testData, );

      setTestData({
        title: "",
        course: "",
        maxMarks: "",
        dueDate: ""
      });

      fetchTests();
    } catch (error) {
      console.log(error);
      alert("Failed to add test");
    }
  };

  const handleDeleteTest = async (id) => {
    try {
      await api.delete(`/api/professor/tests/${id}`);
      fetchTests();
    } catch (error) {
      console.log(error);
      alert("Failed to delete test");
    }
  };

  return (
    <Layout>
      <h2 className="page-title">Tests</h2>

      <div className="card">
        <h3>Add Test</h3>
        <form className="form-grid" onSubmit={handleAddTest}>
          <input type="text" name="title" placeholder="Test Title" value={testData.title} onChange={handleTestChange} required />
          <select name="course" value={testData.course} onChange={handleTestChange}>
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title} ({c.code})
              </option>
            ))}
          </select>
          <input type="number" name="maxMarks" placeholder="Max Marks" value={testData.maxMarks} onChange={handleTestChange} />
          <input type="date" name="dueDate" value={testData.dueDate} onChange={handleTestChange} />
          <button className="btn-primary" type="submit">Add Test</button>
        </form>
      </div>

      <div className="card">
        <h3>All Tests</h3>
        {tests.map((t) => (
          <div key={t._id} className="item-card">
            <p><strong>Title:</strong> {t.title}</p>
            <p><strong>Course:</strong> {t.course?.title || "No course"}</p>
            <p><strong>Max Marks:</strong> {t.maxMarks}</p>
            <p><strong>Due Date:</strong> {t.dueDate ? t.dueDate.slice(0, 10) : "No due date"}</p>
            <button className="btn-danger" onClick={() => handleDeleteTest(t._id)}>Delete Test</button>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default ProfessorTests;