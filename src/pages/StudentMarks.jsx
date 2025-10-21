import React, { useState } from "react";
import { Link } from "react-router-dom";

const StudentMarks = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Doe",
      subjects: [
        { name: "Math", mark: 75 },
        { name: "Science", mark: 82 },
      ],
    },
    {
      id: 2,
      name: "Jane Smith",
      subjects: [
        { name: "Math", mark: 90 },
        { name: "Science", mark: 85 },
      ],
    },
  ]);

  const handleMarkChange = (studentId, subjectName, newMark) => {
    const updatedStudents = students.map((student) => {
      if (student.id === studentId) {
        const updatedSubjects = student.subjects.map((subject) =>
          subject.name === subjectName
            ? { ...subject, mark: parseInt(newMark) || 0 }
            : subject
        );
        return { ...student, subjects: updatedSubjects };
      }
      return student;
    });
    setStudents(updatedStudents);
  };

  const addSubject = (studentId) => {
    const subjectName = prompt("Enter new subject name:");
    if (!subjectName) return;

    const updatedStudents = students.map((student) => {
      if (student.id === studentId) {
        return {
          ...student,
          subjects: [...student.subjects, { name: subjectName, mark: 0 }],
        };
      }
      return student;
    });

    setStudents(updatedStudents);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Enter Student Marks</h2>
      <div className="space-y-8">
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-white shadow-md rounded-lg p-6 border"
          >
            <h3 className="text-xl font-semibold mb-4">{student.name}</h3>
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Subject</th>
                  <th className="border p-2 text-left">Mark</th>
                </tr>
              </thead>
              <tbody>
                {student.subjects.map((subject, index) => (
                  <tr key={index}>
                    <td className="border p-2">{subject.name}</td>
                    <td className="border p-2">
                      <input
                        type="number"
                        value={subject.mark}
                        onChange={(e) =>
                          handleMarkChange(
                            student.id,
                            subject.name,
                            e.target.value
                          )
                        }
                        className="w-20 p-1 border rounded"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => addSubject(student.id)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                + Add Subject
              </button>
              <Link
                to={`/reports/${student.id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                View Report
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentMarks;
