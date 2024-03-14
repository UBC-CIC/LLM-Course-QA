import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import InstructorDashboard from './pages/dashboards/InstructorDashboard';
import StudentDashboard from './pages/dashboards/StudentDashboard';
import UploadFile from './pages/upload/UploadFile';

function App() {
  return (
    <>
    <Router>
        <Routes>
          <Route path="/instructor" element={<InstructorDashboard/>} />
          <Route path="/student" element={<StudentDashboard/>} />
          <Route path="/upload" element={<UploadFile/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
