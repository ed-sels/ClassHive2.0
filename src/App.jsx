// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ClassPage from "./pages/ClassPage";
import SubjectMarks from "./pages/SubjectMarks";
import ReportGeneration from "./pages/ReportGeneration";
import SingleReport from "./pages/SingleReport";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        {/* Navbar */}
        <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">ClassHive 2.0</h1>
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:text-gray-200">Home</Link></li>
            <li><Link to="/dashboard" className="hover:text-gray-200">Dashboard</Link></li>
            <li><Link to="/reports" className="hover:text-gray-200">Reports</Link></li>
          </ul>
        </nav>

        {/* Page Content */}
        <main className="p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/class/:id" element={<ClassPage />} />
            <Route path="/class/:id/subject/:subjectName" element={<SubjectMarks />} />
            <Route path="/reports" element={<ReportGeneration />} />
            <Route path="/reports/:id" element={<SingleReport />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
