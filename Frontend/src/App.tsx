import './App.css';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/Signup';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Chat from './pages/Chat';
import StudentDashboard from './pages/dashboards/Student';
import InstructorDashboard from './pages/dashboards/Instructor';
import UploadFile from './pages/UploadFile';

const App = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" />} />
          <Route path="/auth" element={<Navigate to="/auth/login" />} />
          <Route path="/auth" >
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
          <Route path="/chat" element={<Chat/>} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/instructor" element={<InstructorDashboard />}/>
          <Route path="/upload" element={<UploadFile/>} />
          {/* <Route path="/test" element={<Test />} /> */}
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
