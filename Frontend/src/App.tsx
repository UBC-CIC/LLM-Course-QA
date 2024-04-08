import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentDashboard from './pages/dashboards/StudentDashboard';
import UploadFile from './pages/upload/UploadFile';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import Login from './pages/auth/Login';
import InstructorDashboard from './pages/dashboards/InstructorDashboard';
import Chat from './pages/Chat';
import AdminSettings from './pages/settings/AdminSettings';
import Signup from './pages/auth/Signup';
// import Chat  from './pages/Chat';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/instructor" element={<InstructorDashboard />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/upload" element={<UploadFile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/settings" element={<AdminSettings />} />
        </Routes> 
      </Router>
    </>
  )
}

export default App
