import { useContext, useEffect, useState } from "react";
import axios from "axios";
import api from "../../api/axios";
import Layout from "../../components/Layout";
import { AuthContext } from "../../context/AuthProvider";

function StudentGrades() {
  const { token } = useContext(AuthContext);
  const [grades, setGrades] = useState([]);

  const fetchGrades = async () => {
    try {
      const res = await api.get(`/api/student/grades`);
      setGrades(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) fetchGrades();
  }, [token]);

  return (
    <Layout>
      <h2 className="page-title">Grades</h2>

      <div className="card">
        {grades.length === 0 ? (
          <p>No grades available</p>
        ) : (
          grades.map((g) => (
            <div key={g._id} className="item-card">
              <p><strong>Course:</strong> {g.course?.title}</p>
              <p><strong>Marks:</strong> {g.marks}</p>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}

export default StudentGrades;