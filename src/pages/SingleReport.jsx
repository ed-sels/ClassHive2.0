import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable"; // optional for better tables

const SingleReport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const printRef = useRef();
  const { student, className } = location.state || {};

  if (!student) {
    return (
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        <p>No student data found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  const subjects = Object.keys(student.marks);

  // Calculate total and average
  const totalMarks = subjects.reduce(
    (sum, sub) => sum + Number(student.marks[sub]),
    0
  );
  const averageMarks = subjects.length > 0 ? totalMarks / subjects.length : 0;

  const getGrade = (avg) => {
    if (avg >= 90) return "A+";
    if (avg >= 80) return "A";
    if (avg >= 70) return "B+";
    if (avg >= 60) return "B";
    if (avg >= 50) return "C";
    return "F";
  };

  // Download PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Report for ${student.name}`, 20, 20);
    doc.setFontSize(12);
    doc.text(`Class: ${className}`, 20, 30);

    const tableData = subjects.map((sub) => [sub, student.marks[sub]]);
    tableData.push(["Total", totalMarks]);
    tableData.push(["Average", averageMarks.toFixed(2)]);
    tableData.push(["Grade", getGrade(averageMarks)]);

    doc.autoTable({
      startY: 40,
      head: [["Subject", "Marks"]],
      body: tableData,
    });

    doc.save(`${student.name}_report.pdf`);
  };

  // Print preview
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <div ref={printRef}>
        <h2 className="text-2xl font-bold mb-2 text-blue-600">
          Report for {student.name}
        </h2>
        <h3 className="text-xl font-semibold mb-6">{className}</h3>

        {subjects.length === 0 ? (
          <p className="text-gray-500">No marks entered yet.</p>
        ) : (
          <table className="w-full border-collapse border mb-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">Subject</th>
                <th className="border px-4 py-2 text-left">Marks</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((sub) => (
                <tr key={sub}>
                  <td className="border px-4 py-2">{sub}</td>
                  <td className="border px-4 py-2">{student.marks[sub]}</td>
                </tr>
              ))}
              <tr className="font-bold bg-gray-50">
                <td className="border px-4 py-2">Total</td>
                <td className="border px-4 py-2">{totalMarks}</td>
              </tr>
              <tr className="font-bold bg-gray-50">
                <td className="border px-4 py-2">Average</td>
                <td className="border px-4 py-2">{averageMarks.toFixed(2)}</td>
              </tr>
              <tr className="font-bold bg-gray-50">
                <td className="border px-4 py-2">Grade</td>
                <td className="border px-4 py-2">{getGrade(averageMarks)}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleDownloadPDF}
          className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Download PDF
        </button>
        <button
          onClick={handlePrint}
          className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
        >
          Print Preview
        </button>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Back to Reports
        </button>
      </div>
    </div>
  );
};

export default SingleReport;