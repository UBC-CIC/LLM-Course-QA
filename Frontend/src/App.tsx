import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import InstructorDashboard from './pages/dashboards/InstructorDashboard';

function App() {
  return (
    <>
    <Router>
        <Routes>
          <Route path="/" element={<InstructorDashboard/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
