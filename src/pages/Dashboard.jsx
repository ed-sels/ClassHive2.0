import React, { useContext } from "react";
import { SchoolContext } from "../context/SchoolContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { classes } = useContext(SchoolContext);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">Dashboard</h1>

      {classes.length === 0 ? (
        <p>No classes available.</p>
      ) : (
        <ul className="space-y-4">
          {classes.map((cls) => (
            <li key={cls.id} className="border p-4 rounded shadow flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{cls.name}</h2>
                <p>{cls.students.length} students</p>
              </div>
              <div className="space-x-2">
                <Link
                  to="/marks-entry"
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Enter Marks
                </Link>
                <Link
                  to="/reports"
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  View Reports
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
