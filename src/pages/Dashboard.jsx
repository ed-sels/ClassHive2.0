import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SchoolContext } from "../context/SchoolContext";

const Dashboard = () => {
  const { classes, addClass } = useContext(SchoolContext);
  const [className, setClassName] = useState("");

  const handleAdd = () => {
    addClass(className);
    setClassName("");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Class Dashboard</h2>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={className}
          placeholder="Enter class name"
          onChange={(e) => setClassName(e.target.value)}
          className="border px-3 py-2 rounded flex-1"
        />
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add
        </button>
      </div>

      {classes.length === 0 ? (
        <p className="text-gray-500">No classes added yet.</p>
      ) : (
        <ul className="space-y-2">
          {classes.map((cls) => (
            <li key={cls.id} className="flex justify-between items-center border-b py-2">
              <span>{cls.name}</span>
              <Link
                to={`/class/${cls.id}`}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                View
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
