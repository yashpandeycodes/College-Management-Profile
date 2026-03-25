import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import { AuthContext } from "../../context/AuthProvider";

function StudentAttendance() {
  const { token } = useContext(AuthContext);
  const [attendance, setAttendance] = useState([]);

  const fetchAttendance = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/student/attendance", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAttendance(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) fetchAttendance();
  }, [token]);

  return (
    <Layout>
      <h2 className="page-title">Attendance</h2>

      <div className="card">
        {attendance.length === 0 ? (
          <p>No attendance data</p>
        ) : (
          attendance.map((a) => (
            <div key={a._id} className="item-card">
              <p><strong>Course:</strong> {a.course?.title}</p>
              <p><strong>Percentage:</strong> {a.percentage}%</p>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}

export default StudentAttendance;