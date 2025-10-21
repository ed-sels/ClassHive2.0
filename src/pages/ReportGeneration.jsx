import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SchoolContext } from "../context/SchoolContext";

const ReportGeneration = () => {
  const { classes } = useContext(SchoolContext);

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Reports</h2>

      {classes.length === 0 ? (
        <p>No data available.</p>
      ) : (
        classes.map((cls) => (
          <div key={cls.id} className="mb-6">
            <h3 className="text-xl font-semibold mb-2">{cls.name}</h3>
            {cls.students.length === 0 ? (
              <p className="text-gray-500">No students yet.</p>
            ) : (
              <ul className="space-y-2">
                {cls.students.map((s, i) => (
                  <li key={i} className="flex justify-between border-b py-2">
                    <span>{s.name}</span>
                    <Link
                      to={`/reports/${cls.id}-${i}`}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      state={{ student: s, className: cls.name }}
                    >
                      View Report
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ReportGeneration;
