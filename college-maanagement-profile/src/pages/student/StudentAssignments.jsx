import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import { AuthContext } from "../../context/AuthProvider";

function StudentAssignments() {
  const { token } = useContext(AuthContext);

  const [assignments, setAssignments] = useState([]);
  const [submissionTexts, setSubmissionTexts] = useState({});

  const fetchAssignments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/student/assignments", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAssignments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) fetchAssignments();
  }, [token]);

  const handleChange = (assignmentId, value) => {
    setSubmissionTexts({
      ...submissionTexts,
      [assignmentId]: value
    });
  };

  const handleSubmitAssignment = async (assignmentId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/student/submit/${assignmentId}`,
        { content: submissionTexts[assignmentId] || "" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Assignment submitted successfully");
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Submission failed");
    }
  };

  return (
    <Layout>
      <h2 className="page-title">Assignments</h2>

      {assignments.length === 0 ? (
        <div className="card"><p>No assignments available</p></div>
      ) : (
        assignments.map((a) => (
          <div key={a._id} className="card">
            <p><strong>Title:</strong> {a.title}</p>
            <p><strong>Description:</strong> {a.description}</p>
            <p><strong>Due Date:</strong> {a.dueDate ? a.dueDate.slice(0, 10) : "No due date"}</p>

            <textarea
              placeholder="Write your submission here"
              value={submissionTexts[a._id] || ""}
              onChange={(e) => handleChange(a._id, e.target.value)}
              style={{ width: "100%", height: "80px", marginTop: "10px" }}
            />

            <button className="btn-primary" style={{ marginTop: "10px" }} onClick={() => handleSubmitAssignment(a._id)}>
              Submit Assignment
            </button>
          </div>
        ))
      )}
    </Layout>
  );
}

export default StudentAssignments;