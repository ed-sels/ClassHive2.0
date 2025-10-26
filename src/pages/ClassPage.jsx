import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SchoolContext } from "../context/SchoolContext";

const ClassPage = () => {
  const { id } = useParams();
  const { classes, addSubjectToClass } = useContext(SchoolContext);
  const [subjectName, setSubjectName] = useState("");

  const currentClass = classes.find((cls) => cls.id === id);

  if (!currentClass)
    return <div className="text-center text-red-600 mt-10">Class not found!</div>;

  const handleAdd = () => {
    if (subjectName.trim()) {
      addSubjectToClass(id, subjectName.trim());
      setSubjectName("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">
        {currentClass.name} - Subjects
      </h2>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter new subject"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          className="border px-3 py-2 rounded flex-1"
        />
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add
        </button>
      </div>

      {currentClass.subjects.length === 0 ? (
        <p className="text-gray-500">No subjects added yet.</p>
      ) : (
        <ul className="space-y-3">
          {currentClass.subjects.map((subj, i) => (
            <li key={i} className="flex justify-between border-b py-2">
              <span>{subj}</span>
              <Link
                to={`/class/${id}/subject/${encodeURIComponent(subj)}`}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Enter Marks
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClassPage;
