import React, { useContext, useState } from "react";
import { SchoolContext } from "../context/SchoolContext";
import MarksEntry from "./MarksEntry";

const MarksEntryPage = () => {
  const { classes } = useContext(SchoolContext);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const selectedClass = classes.find((cls) => cls.id === selectedClassId);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">Marks Entry</h1>

      {/* Select Class */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Select Class:</label>
        <select
          value={selectedClassId}
          onChange={(e) => {
            setSelectedClassId(e.target.value);
            setSelectedStudent(null); // reset student selection
          }}
          className="border p-2 rounded w-full"
        >
          <option value="">-- Select Class --</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.name}
            </option>
          ))}
        </select>
      </div>

      {/* List Students */}
      {selectedClass && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Students in {selectedClass.name}:</h2>
          {selectedClass.students.length === 0 ? (
            <p className="text-gray-500">No students yet.</p>
          ) : (
            <ul className="space-y-2">
              {selectedClass.students.map((stu) => (
                <li key={stu.id} className="flex justify-between items-center border-b py-2">
                  <span>{stu.name}</span>
                  <button
                    onClick={() => setSelectedStudent(stu)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Add / Update Marks
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Marks Entry Form */}
      {selectedStudent && selectedClass && (
        <MarksEntry classId={selectedClass.id} student={selectedStudent} />
      )}
    </div>
  );
};

export default MarksEntryPage;
