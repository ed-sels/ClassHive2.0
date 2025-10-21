import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SchoolContext } from "../context/SchoolContext";

const Dashboard = () => {
  const { classes, addClass } = useContext(SchoolContext);
  const [className, setClassName] = useState("");

  const handleAddClass = () => {
    if (!className.trim()) return;
    addClass(className.trim());
    setClassName("");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Dashboard</h2>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter class name"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
        />
        <button onClick={handleAddClass} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Class
        </button>
      </div>

      {classes.length === 0 ? (
        <p className="text-gray-500">No classes created yet.</p>
      ) : (
        <ul className="space-y-3">
          {classes.map((cls) => (
            <li key={cls.id} className="flex justify-between items-center border-b py-2">
              <span>{cls.name}</span>
              <Link to={`/class/${cls.id}`} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                View Class
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
