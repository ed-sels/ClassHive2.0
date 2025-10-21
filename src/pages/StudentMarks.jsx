// src/pages/StudentMarks.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSchool } from "../context/SchoolContext";


export default function StudentMarks() {
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", subjects: { Math: {}, English: {} } },
    { id: 2, name: "Jane Smith", subjects: { Math: {}, English: {} } },
  ]);

  const [subjects] = useState(["Math", "English", "Science", "ICT", "Social Studies"]);

  const handleInputChange = (studentId, subject, field, value) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          const updatedSubject = {
            ...s.subjects[subject],
            [field]: Number(value),
          };
          return {
            ...s,
            subjects: { ...s.subjects, [subject]: updatedSubject },
          };
        }
        return s;
      })
    );
  };

  const calculateTotal = (scores) => {
    const { test1 = 0, test2 = 0, group = 0, project = 0, exam = 0 } = scores;
    const rawTotal = test1 + test2 + group + project + exam;
    const maxTotal = 200; // 20 + 20 + 20 + 40 + 100
    return (rawTotal / maxTotal) * 100;
  };

  const calculateGrade = (mark) => {
    if (mark >= 80) return "A";
    if (mark >= 70) return "B";
    if (mark >= 60) return "C";
    if (mark >= 50) return "D";
    return "F";
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Enter Student Marks</h2>
      <div className="space-y-8">
        {students.map((student) => (
          <div key={student.id} className="border p-4 rounded-lg shadow-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{student.name}</h3>
              <Link
                to={`/reports/${student.id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                View Report
              </Link>
            </div>

            {subjects.map((subject) => (
              <div key={subject} className="mb-6 border-t pt-4">
                <h4 className="text-lg font-medium mb-2">{subject}</h4>
                <div className="grid grid-cols-5 gap-2 mb-2">
                  <input
                    type="number"
                    placeholder="Test 1 (20)"
                    className="border p-2 rounded"
                    onChange={(e) => handleInputChange(student.id, subject, "test1", e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Test 2 (20)"
                    className="border p-2 rounded"
                    onChange={(e) => handleInputChange(student.id, subject, "test2", e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Group Work (20)"
                    className="border p-2 rounded"
                    onChange={(e) => handleInputChange(student.id, subject, "group", e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Project (40)"
                    className="border p-2 rounded"
                    onChange={(e) => handleInputChange(student.id, subject, "project", e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Exam (100)"
                    className="border p-2 rounded"
                    onChange={(e) => handleInputChange(student.id, subject, "exam", e.target.value)}
                  />
                </div>

                <p className="text-gray-700 text-sm">
                  Striked Total: {calculateTotal(student.subjects[subject] || {}).toFixed(2)}% — Grade: {calculateGrade(calculateTotal(student.subjects[subject] || {}))}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}