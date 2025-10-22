import React, { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { SchoolContext } from "../context/SchoolContext";

const ClassPage = () => {
  const { id } = useParams();
  const { classes, addStudentToClass, addSubjectToClass } = useContext(SchoolContext);
  const cls = classes.find((c) => c.id === id);

  const [newStudent, setNewStudent] = useState("");
  const [newSubject, setNewSubject] = useState("");

  if (!cls) return <p>Class not found</p>;

  const handleAddStudent = () => {
    if (!newStudent) return;
    addStudentToClass(cls.id, newStudent);
    setNewStudent("");
  };

  const handleAddSubject = () => {
    if (!newSubject) return;
    addSubjectToClass(cls.id, newSubject);
    setNewSubject("");
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">{cls.name}</h1>

      {/* Add Subject */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Subjects</h2>
        <ul className="mb-2">
          {cls.subjects.map((sub) => (
            <li key={sub} className="flex justify-between border-b py-1">
              {sub}
              <Link
                to={`/class/${cls.id}/subject/${sub}`}
                className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
              >
                Enter Marks
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex space-x-2 mt-2">
          <input
            type="text"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            placeholder="New Subject"
            className="border p-2 rounded flex-1"
          />
          <button
            onClick={handleAddSubject}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Subject
          </button>
        </div>
      </div>

      {/* Students */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Students</h2>
        <ul className="mb-2">
          {cls.students.map((stu) => (
            <li key={stu.id} className="flex justify-between border-b py-1">
              {stu.name}
              <Link
                to={`/reports/${stu.id}`}
                state={{ student: stu, className: cls.name }}
                className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
              >
                View Report
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex space-x-2 mt-2">
          <input
            type="text"
            value={newStudent}
            onChange={(e) => setNewStudent(e.target.value)}
            placeholder="New Student"
            className="border p-2 rounded flex-1"
          />
          <button
            onClick={handleAddStudent}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassPage;
