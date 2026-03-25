import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyOtp from "./pages/VerifyOtp";
import PrivateRoute from "./components/PrivateRoute";

// admin
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminCourses from "./pages/Admin/AdminCourses";
import AdminCalendar from "./pages/Admin/AdminCalendar";
import AdminLogs from "./pages/Admin/AdminLogs";

// professor
import ProfessorDashboard from "./pages/professor/ProfessorDashboard";
import ProfessorAssignments from "./pages/professor/ProfessorAssignments";
import ProfessorTests from "./pages/professor/ProfessorTests";
import ProfessorSubmissions from "./pages/professor/ProfessorSubmissions";
import ProfessorGrades from "./pages/professor/ProfessorGrades";
import ProfessorAttendance from "./pages/professor/ProfessorAttendance";
import ProfessorAnalytics from "./pages/professor/ProfessorAnalytics";
import ProfessorCalendar from "./pages/professor/ProfessorCalendar";

// student
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentAssignments from "./pages/student/StudentAssignments";
import StudentTests from "./pages/student/StudentTests";
import StudentGrades from "./pages/student/StudentGrades";
import StudentAttendance from "./pages/student/StudentAttendance";
import StudentCalendar from "./pages/student/StudentCalendar";
import StudentProgress from "./pages/student/StudentProgress";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminUsers />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminCourses />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/calendar"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminCalendar />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/logs"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminLogs />
            </PrivateRoute>
          }
        />

        <Route
          path="/professor"
          element={
            <PrivateRoute allowedRoles={["professor"]}>
              <ProfessorDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/professor/assignments"
          element={
            <PrivateRoute allowedRoles={["professor"]}>
              <ProfessorAssignments />
            </PrivateRoute>
          }
        />
        <Route
          path="/professor/tests"
          element={
            <PrivateRoute allowedRoles={["professor"]}>
              <ProfessorTests />
            </PrivateRoute>
          }
        />
        <Route
          path="/professor/submissions"
          element={
            <PrivateRoute allowedRoles={["professor"]}>
              <ProfessorSubmissions />
            </PrivateRoute>
          }
        />
        <Route
          path="/professor/grades"
          element={
            <PrivateRoute allowedRoles={["professor"]}>
              <ProfessorGrades />
            </PrivateRoute>
          }
        />
        <Route
          path="/professor/attendance"
          element={
            <PrivateRoute allowedRoles={["professor"]}>
              <ProfessorAttendance />
            </PrivateRoute>
          }
        />
        <Route
          path="/professor/analytics"
          element={
            <PrivateRoute allowedRoles={["professor"]}>
              <ProfessorAnalytics />
            </PrivateRoute>
          }
        />

         <Route
          path="/professor/calendar"
          element={
            <PrivateRoute allowedRoles={["professor"]}>
              <ProfessorCalendar />
            </PrivateRoute>
          }
        />

        <Route
          path="/student"
          element={
            <PrivateRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/assignments"
          element={
            <PrivateRoute allowedRoles={["student"]}>
              <StudentAssignments />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/tests"
          element={
            <PrivateRoute allowedRoles={["student"]}>
              <StudentTests />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/grades"
          element={
            <PrivateRoute allowedRoles={["student"]}>
              <StudentGrades />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/attendance"
          element={
            <PrivateRoute allowedRoles={["student"]}>
              <StudentAttendance />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/calendar"
          element={
            <PrivateRoute allowedRoles={["student"]}>
              <StudentCalendar />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/progress"
          element={
            <PrivateRoute allowedRoles={["student"]}>
              <StudentProgress />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;