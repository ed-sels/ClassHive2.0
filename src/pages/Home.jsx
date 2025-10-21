import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div className="text-center py-16">
    <h1 className="text-4xl font-bold text-blue-600 mb-6">Welcome to ClassHive 2.0</h1>
    <p className="text-gray-600 mb-8">Manage classes, subjects, marks, and generate student reports easily.</p>
    <Link to="/dashboard" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
      Get Started
    </Link>
  </div>
);

export default Home;
