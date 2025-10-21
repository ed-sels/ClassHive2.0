import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function ReportCard({ student }) {
  const reportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
    documentTitle: `${student.name}_ReportCard`,
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4">
      <div ref={reportRef}>
        <h2 className="text-2xl font-bold text-center">Report Card</h2>
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Class:</strong> {student.class}</p>

        <table className="w-full border mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Subject</th>
              <th className="border p-2">Score</th>
              <th className="border p-2">Comment</th>
            </tr>
          </thead>
          <tbody>
            {student.grades.map((g, i) => (
              <tr key={i}>
                <td className="border p-2">{g.subject}</td>
                <td className="border p-2">{g.score}</td>
                <td className="border p-2">{g.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handlePrint} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Print Report
      </button>
    </div>
  );
}
