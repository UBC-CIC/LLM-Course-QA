import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentDashboard from './pages/dashboards/StudentDashboard';
import UploadFile from './pages/upload/UploadFile';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import Login from './pages/auth/Login';
import InstructorDashboard from './pages/dashboards/InstructorDashboard';
import Chat from './pages/Chat';
import AdminSettings from './pages/settings/AdminSettings';
import Signup from './pages/auth/Signup';
import CourseUsers from './pages/users/CourseUsers';
import { Navigate } from 'react-router-dom';
import InstitutionUsers from './pages/users/InstitutionUsers';
import Reports from './pages/Reports';

function App() {
  // const { user } = useAuthContext();
  const user = localStorage.getItem('user');
  const role = user ? JSON.parse(user).role : null;

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={!user ? <Navigate to="/login" /> : <Navigate to="/dashboard"/>} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard"/>} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/dashboard"/>} />
          <Route path="/dashboard" element={user ? (role === "Role.Student" ? <StudentDashboard /> : (role === "Role.Instructor" ? <InstructorDashboard/> :  <AdminDashboard />)) : <Navigate to="/"/>} />
          <Route path="/upload/:id" element={user ? (role === "Role.Instructor" ? <UploadFile /> : <Navigate to="/"/>) : <Navigate to="/"/>} />
          <Route path="/chat" element={user ? (role === "Role.Student" ? <Chat /> : (role === "Role.Instructor" ? <Chat /> : <Navigate to="/"/>)) : <Navigate to="/"/>} />
          <Route path="/chat/:id" element={user ? (role === "Role.Student" ? <Chat /> : (role === "Role.Instructor" ? <Chat /> : <Navigate to="/"/>)) : <Navigate to="/"/>} />
          <Route path="/settings" element={<AdminSettings />} />
          <Route path="/users" element={user ? (role === "Role.Admin" ? <InstitutionUsers /> : <Navigate to="/"/>) : <Navigate to="/"/>} />
          <Route path="/users/:id" element={user ? (role === "Role.Instructor" ? <CourseUsers /> : <Navigate to="/users"/>) : <Navigate to="/"/>} />
          <Route path="/reports" element={user ? (role === "Role.Instructor" ? <Reports /> : <Navigate to="/"/>) : <Navigate to="/"/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App