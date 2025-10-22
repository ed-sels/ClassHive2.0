import React, { useContext, useState } from "react";
import { SchoolContext } from "../context/SchoolContext";

const MarksEntry = ({ classId, student }) => {
  const { addOrUpdateStudentMark, classes } = useContext(SchoolContext);
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");

  const cls = classes.find((c) => c.id === classId);

  const handleAddMark = () => {
    if (!subject || !marks) return;
    addOrUpdateStudentMark(classId, student.id, subject, Number(marks));
    setSubject("");
    setMarks("");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">{student.name} - Add Marks</h2>

      <select
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="border p-2 rounded w-full mb-3"
      >
        <option value="">Select Subject</option>
        {cls.subjects.map((sub) => (
          <option key={sub} value={sub}>
            {sub}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Marks"
        value={marks}
        onChange={(e) => setMarks(e.target.value)}
        className="border p-2 rounded w-full mb-3"
      />

      <button
        onClick={handleAddMark}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add / Update Marks
      </button>

      {Object.keys(student.marks).length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Current Marks:</h3>
          <ul>
            {Object.entries(student.marks).map(([sub, mark]) => (
              <li key={sub}>
                {sub}: {mark}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MarksEntry;
