import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentDashboard from './pages/dashboards/StudentDashboard';
import UploadFile from './pages/upload/UploadFile';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import Login from './pages/auth/Login';
import InstructorDashboard from './pages/dashboards/InstructorDashboard';
// import AdminSettings from './pages/settings/AdminSettings';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/instructor" element={<InstructorDashboard />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/upload" element={<UploadFile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* <Route path="/settings" elesment={<AdminSettings/>} /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
