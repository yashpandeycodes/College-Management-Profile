import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

function Sidebar() {
  const { user } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <div className="sidebar-heading">Navigation</div>

      {user?.role === "admin" && (
        <>
          <NavLink to="/admin">Dashboard</NavLink>
          <NavLink to="/admin/users">Users</NavLink>
          <NavLink to="/admin/courses">Courses</NavLink>
          <NavLink to="/admin/calendar">Calendar</NavLink>
          <NavLink to="/admin/logs">Login Logs</NavLink>
        </>
      )}

      {user?.role === "professor" && (
        <>
          <NavLink to="/professor">Dashboard</NavLink>
          <NavLink to="/professor/assignments">Assignments</NavLink>
          <NavLink to="/professor/tests">Tests</NavLink>
          <NavLink to="/professor/submissions">Submissions</NavLink>
          <NavLink to="/professor/grades">Grades</NavLink>
          <NavLink to="/professor/attendance">Attendance</NavLink>
          <NavLink to="/professor/analytics">Analytics</NavLink>
          <NavLink to="/professor/calendar">Calendar</NavLink>
        </>
      )}

      {user?.role === "student" && (
        <>
          <NavLink to="/student">Dashboard</NavLink>
          <NavLink to="/student/assignments">Assignments</NavLink>
          <NavLink to="/student/tests">Tests</NavLink>
          <NavLink to="/student/grades">Grades</NavLink>
          <NavLink to="/student/attendance">Attendance</NavLink>
          <NavLink to="/student/calendar">Calendar</NavLink>
          <NavLink to="/student/progress">Progress</NavLink>
        </>
      )}
    </div>
  );
}

export default Sidebar;