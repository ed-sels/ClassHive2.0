import { useEffect, useState } from "react";

export default function ReportGeneration() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("students");
    if (saved) setStudents(JSON.parse(saved));
  }, []);

  const calculateAverage = (subjects) => {
    const total = subjects.reduce(
      (acc, s) => acc + (parseFloat(s.marks) || 0),
      0
    );
    return subjects.length ? (total / subjects.length).toFixed(2) : "0.00";
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Student Report Cards
      </h1>

      {students.length === 0 ? (
        <p className="text-center text-gray-600">
          No student data found. Please enter marks first.
        </p>
      ) : (
        <div className="space-y-8">
          {students.map((student) => (
            <div
              key={student.id}
              className="border rounded-lg shadow-md bg-white p-6 print:border-none print:shadow-none print:mt-0"
            >
              <h2 className="text-2xl font-semibold mb-2">
                {student.name}
              </h2>
              <table className="w-full border-collapse mb-4">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-4 py-2 text-left">Subject</th>
                    <th className="border px-4 py-2 text-left">Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {student.subjects.map((s, i) => (
                    <tr key={i}>
                      <td className="border px-4 py-2">{s.name}</td>
                      <td className="border px-4 py-2">{s.marks}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100 font-semibold">
                    <td className="border px-4 py-2">Average</td>
                    <td className="border px-4 py-2">
                      {calculateAverage(student.subjects)}
                    </td>
                  </tr>
                </tbody>
              </table>

              <p className="text-gray-700 mb-4">
                <strong>Teacher’s Comment:</strong>{" "}
                {calculateAverage(student.subjects) >= 80
                  ? "Excellent performance!"
                  : calculateAverage(student.subjects) >= 60
                  ? "Good job! Keep improving."
                  : "Needs improvement. Study harder."}
              </p>
            </div>
          ))}

          <div className="text-center print:hidden">
            <button
              onClick={handlePrint}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              🖨️ Print Report Cards
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
