import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import StudentPortal from "./pages/StudentPortal";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/student" element={<StudentPortal />} />
      </Routes>
    </Router>
  );
}

export default App;
