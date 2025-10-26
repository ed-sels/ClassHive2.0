import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div className="text-center mt-16">
    <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to ClassHive 2.0</h1>
    <p className="text-gray-700 mb-6">Manage your classes, subjects, marks, and reports with ease.</p>
    <Link to="/dashboard" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
      Go to Dashboard
    </Link>
  </div>
);

export default Home;
