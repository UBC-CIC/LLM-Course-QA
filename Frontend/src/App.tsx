import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import InstructorDashboard from './pages/dashboards/InstructorDashboard';
import StudentDashboard from './pages/dashboards/StudentDashboard';
import UploadFile from './pages/upload/UploadFile';
import AdminDashboard from './pages/dashboards/AdminDashboard';
// import AdminSettings from './pages/settings/AdminSettings';

function App() {
  return (
    <>
    <Router>
        <Routes>
          <Route path="/courses" element={<InstructorDashboard/>} />
          <Route path="/student" element={<StudentDashboard/>} />
          <Route path="/upload" element={<UploadFile/>} />
          <Route path="/admin" element={<AdminDashboard/>} />
          {/* <Route path="/settings" elesment={<AdminSettings/>} /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
