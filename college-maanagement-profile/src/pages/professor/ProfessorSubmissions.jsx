import { useContext, useEffect, useState } from "react";
import axios from "axios";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import { AuthContext } from "../../context/AuthProvider";

function ProfessorSubmissions() {
  const { token } = useContext(AuthContext);

  const [submissions, setSubmissions] = useState([]);
  const [testSubmissions, setTestSubmissions] = useState([]);

  const fetchSubmissions = async () => {
    try {
      const res = await api.get(`/api/professor/submissions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubmissions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTestSubmissions = async () => {
    try {
      const res = await api.get(`/api/professor/test-submissions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTestSubmissions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchSubmissions();
      fetchTestSubmissions();
    }
  }, [token]);

  const handleDeleteSubmission = async (id) => {
    try {
      await api.delete(`/api/professor/submissions/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchSubmissions();
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Failed to delete submission");
    }
  };

  return (
    <Layout>
      <h2 className="page-title">Submissions</h2>

      <div className="card">
        <h3>Assignment Submissions</h3>
        {submissions.length === 0 ? (
          <p>No submissions yet</p>
        ) : (
          submissions.map((s) => (
            <div key={s._id} className="item-card">
              <p><strong>Assignment:</strong> {s.assignment?.title}</p>
              <p><strong>Student:</strong> {s.student?.name} ({s.student?.email})</p>
              <p><strong>Content:</strong> {s.content}</p>
              <p><strong>Status:</strong> {s.status}</p>
              <button className="btn-danger" onClick={() => handleDeleteSubmission(s._id)}>Delete Submission</button>
            </div>
          ))
        )}
      </div>

      <div className="card">
        <h3>Test Submissions</h3>
        {testSubmissions.length === 0 ? (
          <p>No test submissions yet</p>
        ) : (
          testSubmissions.map((s) => (
            <div key={s._id} className="item-card">
              <p><strong>Test:</strong> {s.test?.title}</p>
              <p><strong>Student:</strong> {s.student?.name} ({s.student?.email})</p>
              <p><strong>Content:</strong> {s.content}</p>
              <p><strong>Status:</strong> {s.status}</p>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}

export default ProfessorSubmissions;