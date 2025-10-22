import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { SchoolContext } from "../context/SchoolContext";

const SubjectMarks = () => {
  const { id, subjectName } = useParams();
  const { classes, addOrUpdateStudentMark } = useContext(SchoolContext);
  const cls = classes.find((c) => c.id === id);

  const [marksInput, setMarksInput] = useState({}); // { studentId: marks }

  if (!cls) return <p>Class not found</p>;

  const handleChange = (studentId, value) => {
    setMarksInput((prev) => ({ ...prev, [studentId]: value }));
  };

  const handleSaveMarks = () => {
    Object.entries(marksInput).forEach(([studentId, mark]) => {
      if (mark !== "") addOrUpdateStudentMark(cls.id, studentId, subjectName, Number(mark));
    });
    alert("Marks saved successfully!");
    setMarksInput({});
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">
        Enter Marks for "{subjectName}" - {cls.name}
      </h1>

      <table className="w-full border-collapse mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">Student</th>
            <th className="border px-4 py-2 text-left">Marks</th>
          </tr>
        </thead>
        <tbody>
          {cls.students.map((stu) => (
            <tr key={stu.id}>
              <td className="border px-4 py-2">{stu.name}</td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  value={marksInput[stu.id] ?? stu.marks[subjectName] ?? ""}
                  onChange={(e) => handleChange(stu.id, e.target.value)}
                  className="border p-1 rounded w-24"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleSaveMarks}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Save Marks
      </button>
    </div>
  );
};

export default SubjectMarks;
