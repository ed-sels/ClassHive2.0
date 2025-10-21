import React from "react";
import { useLocation } from "react-router-dom";

const SingleReport = () => {
  const location = useLocation();
  const { student, className } = location.state || {};

  if (!student)
    return <div className="text-center text-red-600">Student data not found.</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">{className} - Report Card</h2>
      <p className="text-lg mb-4 font-semibold">Student: {student.name}</p>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Subject</th>
            <th className="p-2 border">Class Score</th>
            <th className="p-2 border">Exam</th>
            <th className="p-2 border">Total (100)</th>
            <th className="p-2 border">Grade</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(student.marks || {}).map(([subject, mark]) => {
            const classScore =
              Number(mark.test1) +
              Number(mark.test2) +
              Number(mark.group) +
              Number(mark.project);
            return (
              <tr key={subject}>
                <td className="border p-2">{subject}</td>
                <td className="border p-2">{classScore}</td>
                <td className="border p-2">{mark.exam}</td>
                <td className="border p-2">{mark.striked}</td>
                <td className="border p-2">{mark.grade}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SingleReport;
