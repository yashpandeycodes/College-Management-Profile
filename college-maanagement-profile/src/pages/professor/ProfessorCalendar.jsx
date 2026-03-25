import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import { AuthContext } from "../../context/AuthProvider";

function ProfessorCalendar() {
  const { token } = useContext(AuthContext);
  const [calendar, setCalendar] = useState([]);

  const fetchCalendar = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/professor/calendar", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCalendar(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) fetchCalendar();
  }, [token]);

  return (
    <Layout>
      <h2 className="page-title">Academic Calendar</h2>

      <div className="card">
        {calendar.length === 0 ? (
          <p>No calendar events</p>
        ) : (
          calendar.map((event) => (
            <div key={event._id} className="item-card">
              <p><strong>Title:</strong> {event.title}</p>
              <p><strong>Date:</strong> {event.date ? event.date.slice(0, 10) : ""}</p>
              <p><strong>Category:</strong> {event.category}</p>
              <p><strong>Audience:</strong> {event.audience}</p>
              <p>
                <strong>Priority:</strong>{" "}
                <span
                  className={`calendar-tag ${
                    event.priority === "High"
                      ? "priority-high"
                      : event.priority === "Medium"
                      ? "priority-medium"
                      : "priority-low"
                  }`}
                >
                  {event.priority}
                </span>
              </p>
              <p><strong>Description:</strong> {event.description}</p>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}

export default ProfessorCalendar;