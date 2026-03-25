import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import { AuthContext } from "../../context/AuthProvider";

function AdminCalendar() {
  const { token } = useContext(AuthContext);

  const [calendarEvents, setCalendarEvents] = useState([]);
 const [calendarData, setCalendarData] = useState({
  title: "",
  date: "",
  description: "",
  category: "Event",
  audience: "All",
  priority: "Medium"
});

  const fetchCalendarEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/calendar", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCalendarEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) fetchCalendarEvents();
  }, [token]);

  const handleCalendarChange = (e) => {
    setCalendarData({
      ...calendarData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddCalendarEvent = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/admin/calendar", calendarData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setCalendarData({
        title: "",
        date: "",
        description: ""
      });

      fetchCalendarEvents();
    } catch (error) {
      console.log(error);
      alert("Failed to add event");
    }
  };

  const handleDeleteCalendarEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/calendar/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCalendarEvents();
    } catch (error) {
      console.log(error);
      alert("Failed to delete event");
    }
  };

  return (
    <Layout>
      <h2 className="page-title">Academic Calendar</h2>

      <div className="card">
        <h3>Add Event</h3>
       <form className="form-grid" onSubmit={handleAddCalendarEvent}>
  <input
    type="text"
    name="title"
    placeholder="Event Title"
    value={calendarData.title}
    onChange={handleCalendarChange}
    required
  />

  <input
    type="date"
    name="date"
    value={calendarData.date}
    onChange={handleCalendarChange}
    required
  />

  <input
    type="text"
    name="description"
    placeholder="Description"
    value={calendarData.description}
    onChange={handleCalendarChange}
  />

  <select
    name="category"
    value={calendarData.category}
    onChange={handleCalendarChange}
  >
    <option value="Exam">Exam</option>
    <option value="Holiday">Holiday</option>
    <option value="Assignment">Assignment</option>
    <option value="Registration">Registration</option>
    <option value="Event">Event</option>
  </select>

  <select
    name="audience"
    value={calendarData.audience}
    onChange={handleCalendarChange}
  >
    <option value="All">All</option>
    <option value="Students">Students</option>
    <option value="Professors">Professors</option>
  </select>

  <select
    name="priority"
    value={calendarData.priority}
    onChange={handleCalendarChange}
  >
    <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
  </select>

  <button className="btn-primary" type="submit">Add Event</button>
</form>
      </div>

      <div className="card">
        <h3>All Events</h3>
        {calendarEvents.length === 0 ? (
          <p>No events found</p>
        ) : (calendarEvents.map((event) => (
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

    <button
      className="btn-danger"
      onClick={() => handleDeleteCalendarEvent(event._id)}
    >
      Delete Event
    </button>
  </div>
)))}
      </div>
    </Layout>
  );
}

export default AdminCalendar;