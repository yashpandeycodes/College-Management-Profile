import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import { AuthContext } from "../../context/AuthProvider";

function ProfessorAssignments() {
  const { token } = useContext(AuthContext);

  const [assignments, setAssignments] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: ""
  });

  const fetchAssignments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/professor/assignments", {
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/professor/assignments", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setFormData({ title: "", description: "", dueDate: "" });
      fetchAssignments();
    } catch (error) {
      console.log(error);
      alert("Failed to add assignment");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/professor/assignments/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAssignments();
    } catch (error) {
      console.log(error);
      alert("Failed to delete assignment");
    }
  };

  return (
    <Layout>
      <h2 className="page-title">Assignments</h2>

      <div className="card">
        <h3>Add Assignment</h3>
        <form className="form-grid" onSubmit={handleAdd}>
          <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
          <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
          <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
          <button className="btn-primary" type="submit">Add Assignment</button>
        </form>
      </div>

      <div className="card">
        <h3>All Assignments</h3>
        {assignments.map((a) => (
          <div key={a._id} className="item-card">
            <p><strong>Title:</strong> {a.title}</p>
            <p><strong>Description:</strong> {a.description}</p>
            <p><strong>Due Date:</strong> {a.dueDate ? a.dueDate.slice(0, 10) : "No due date"}</p>
            <button className="btn-danger" onClick={() => handleDelete(a._id)}>Delete Assignment</button>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default ProfessorAssignments;