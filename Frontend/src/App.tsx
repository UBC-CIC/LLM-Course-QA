import './App.css';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/Signup';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Chat from './pages/Chat';
import StudentDashboard from './pages/dashboards/Student';
import InstructorDashboard from './pages/dashboards/Instructor';
import UploadFile from './pages/UploadFile';

const App = () => {
  const user = localStorage.getItem('user');
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={!user ? <Navigate to="/auth/login" /> : <Navigate to="/dashboard"/>} />
          <Route path="/auth" element={!user ? <Navigate to="/auth/login" /> : <Navigate to="/dashboard"/>} />
          <Route path="/auth" >
            <Route path="login" element={!user ? <Login /> : <Navigate to="/dashboard"/>} />
            <Route path="signup" element={!user ? <SignUp /> : <Navigate to="/dashboard"/>} />
          </Route>
          <Route path="/chat" element={user ? <Chat/> : <Navigate to="/"/>} />
          <Route path="/dashboard" element={user ? (JSON.parse(user).role === "Role.Student" ? <StudentDashboard /> : <InstructorDashboard/>) : <Navigate to="/"/>} />
          <Route path="/upload" element={user && JSON.parse(user).role === "Role.Instructor" ? <UploadFile/> : <Navigate to="/"/>} />
          {/* <Route path="/test" element={<Test />} /> */}
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
