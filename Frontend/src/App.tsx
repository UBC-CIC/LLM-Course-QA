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
import { useState, useEffect } from 'react';

function App() {
  const [role, setRole] = useState<any>(null);
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (user) {
      const userId = user ? JSON.parse(user).id : null;
      const getUserRole = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/users/${userId}/role`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
          },
        });

        const json = await response.json();
        if (response.ok) {
          console.log('Role fetched successfully: ' + json.role);
          setRole(json.role);
        }
      };
      getUserRole();
    }
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={!role ? <Navigate to="/login" /> : <Navigate to="/dashboard" />} />
          <Route path="/login" element={!role ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/signup" element={!role ? <Signup /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={role ? (role === "Role.Student" ? <StudentDashboard /> : (role === "Role.Instructor" ? <InstructorDashboard /> : <AdminDashboard />)) : <Navigate to="/" />} />
          <Route path="/upload/:id" element={role ? (role === "Role.Instructor" ? <UploadFile /> : <Navigate to="/" />) : <Navigate to="/" />} />
          <Route path="/chat" element={role ? (role === "Role.Student" ? <Chat /> : (role === "Role.Instructor" ? <Chat /> : <Navigate to="/" />)) : <Navigate to="/" />} />
          <Route path="/chat/:id" element={role ? (role === "Role.Student" ? <Chat /> : (role === "Role.Instructor" ? <Chat /> : <Navigate to="/" />)) : <Navigate to="/" />} />
          <Route path="/settings" element={<AdminSettings />} />
          <Route path="/users" element={role ? (role === "Role.Admin" ? <InstitutionUsers /> : <Navigate to="/" />) : <Navigate to="/" />} />
          <Route path="/users/:id" element={role ? (role === "Role.Instructor" ? <CourseUsers /> : <Navigate to="/users" />) : <Navigate to="/" />} />
          <Route path="/reports" element={role ? (role === "Role.Instructor" ? <Reports /> : <Navigate to="/" />) : <Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  )
}

export default App