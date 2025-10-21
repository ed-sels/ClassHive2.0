import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold">ClassHive 2.0</Link>
      <div className="flex gap-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/add-student" className="hover:underline">Add Student</Link>
        <Link to="/add-grades" className="hover:underline">Grades</Link>
        <Link to="/report" className="hover:underline">Reports</Link>
      </div>
    </nav>
  );
}
