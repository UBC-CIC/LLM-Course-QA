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
  const [role, setRole] = useState(localStorage.getItem('role'));
  const token = localStorage.getItem('token');

  if (!role && token) {
    const getUserRole = async () => {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/users/role`, {
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
        localStorage.setItem('role', json.role);
      }
    };
    getUserRole();
  }

  console.log("role: " + role)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={!role ? <Navigate to="/login" /> : <Navigate to="/dashboard" />} />
          <Route path="/login" element={!role ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/signup" element={!role ? <Signup /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={role ? (role === "Student" ? <StudentDashboard /> : (role === "Instructor" ? <InstructorDashboard /> : <AdminDashboard />)) : <Navigate to="/" />} />
          <Route path="/upload/:id" element={role ? (role === "Instructor" ? <UploadFile /> : <Navigate to="/" />) : <Navigate to="/" />} />
          <Route path="/chat" element={role ? (role === "Student" ? <Chat /> : (role === "Instructor" ? <Chat /> : <Navigate to="/" />)) : <Navigate to="/" />} />
          <Route path="/chat/:id" element={role ? (role === "Student" ? <Chat /> : (role === "Instructor" ? <Chat /> : <Navigate to="/" />)) : <Navigate to="/" />} />
          <Route path="/settings" element={<AdminSettings />} />
          <Route path="/users" element={role ? (role === "Admin" ? <InstitutionUsers /> : <Navigate to="/" />) : <Navigate to="/" />} />
          <Route path="/users/:id" element={role ? (role === "Instructor" ? <CourseUsers /> : <Navigate to="/users" />) : <Navigate to="/" />} />
          <Route path="/reports" element={role ? (role === "Instructor" ? <Reports /> : <Navigate to="/" />) : <Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  )
}

export default App