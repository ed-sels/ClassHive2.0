import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SchoolContext } from "../context/SchoolContext";

const ReportGeneration = () => {
  const { classes } = useContext(SchoolContext);

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Generate Reports</h2>

      {classes.length === 0 ? (
        <p>No classes available.</p>
      ) : (
        <ul className="space-y-3">
          {classes.map((cls) => (
            <li key={cls.id} className="flex justify-between border-b py-2">
              <span>{cls.name}</span>
              <Link to={`/reports/${cls.id}`} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                View Report
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReportGeneration;
