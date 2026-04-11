import { useContext, useEffect, useState } from "react";
import axios from "axios";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import { AuthContext } from "../../context/AuthProvider";

function StudentTests() {
  const { token } = useContext(AuthContext);

  const [tests, setTests] = useState([]);
  const [testTexts, setTestTexts] = useState({});

  const fetchTests = async () => {
    try {
      const res = await api.get(`/api/student/tests`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTests(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) fetchTests();
  }, [token]);

  const handleTestChange = (testId, value) => {
    setTestTexts({
      ...testTexts,
      [testId]: value
    });
  };

  const handleSubmitTest = async (testId) => {
    try {
      await api.post(
        `/api/student/submit-test/${testId}`,
        { content: testTexts[testId] || "" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Test submitted successfully");
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Test submission failed");
    }
  };

  return (
    <Layout>
      <h2 className="page-title">Tests</h2>

      {tests.length === 0 ? (
        <div className="card"><p>No tests available</p></div>
      ) : (
        tests.map((t) => (
          <div key={t._id} className="card">
            <p><strong>Title:</strong> {t.title}</p>
            <p><strong>Course:</strong> {t.course?.title || "No course"}</p>
            <p><strong>Max Marks:</strong> {t.maxMarks}</p>
            <p><strong>Due Date:</strong> {t.dueDate ? t.dueDate.slice(0, 10) : "No due date"}</p>

            <textarea
              placeholder="Write your test submission here"
              value={testTexts[t._id] || ""}
              onChange={(e) => handleTestChange(t._id, e.target.value)}
              style={{ width: "100%", height: "80px", marginTop: "10px" }}
            />

            <button className="btn-primary" style={{ marginTop: "10px" }} onClick={() => handleSubmitTest(t._id)}>
              Submit Test
            </button>
          </div>
        ))
      )}
    </Layout>
  );
}

export default StudentTests;