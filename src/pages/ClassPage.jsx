import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SchoolContext } from "../context/SchoolContext";

const ClassPage = () => {
  const { id } = useParams();
  const { classes, addSubjectToClass, addStudentToClass } = useContext(SchoolContext);
  const [subjectName, setSubjectName] = useState("");
  const [studentName, setStudentName] = useState("");

  const currentClass = classes.find((cls) => cls.id === id);
  if (!currentClass) return <div className="text-center text-red-600">Class not found!</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">{currentClass.name}</h2>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="New subject"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={() => { addSubjectToClass(id, subjectName); setSubjectName(""); }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Subject
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="New student"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={() => { addStudentToClass(id, studentName); setStudentName(""); }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Student
        </button>
      </div>

      <h3 className="font-bold mb-3 text-lg">Subjects</h3>
      <ul className="space-y-3">
        {currentClass.subjects.map((subj, i) => (
          <li key={i} className="flex justify-between items-center border-b py-2">
            <span>{subj}</span>
            <Link to={`/class/${id}/subject/${encodeURIComponent(subj)}`} className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700">
              Enter Marks
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassPage;
