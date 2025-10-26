import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { SchoolContext } from "../context/SchoolContext";

const SubjectMarks = () => {
  const { id, subjectName } = useParams();
  const { classes, saveMarks } = useContext(SchoolContext);
  const [studentName, setStudentName] = useState("");
  const [classScore, setClassScore] = useState("");
  const [examScore, setExamScore] = useState("");

  const currentClass = classes.find((cls) => cls.id === id);
  const marks = currentClass?.[`${subjectName}-marks`] || [];

  const handleSave = () => {
    if (!studentName.trim()) return;
    saveMarks(id, subjectName, studentName, Number(classScore), Number(examScore));
    setStudentName("");
    setClassScore("");
    setExamScore("");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">
        {subjectName} - {currentClass?.name}
      </h2>

      <div className="flex gap-2 mb-6">
        <input type="text" placeholder="Student name" value={studentName} onChange={(e) => setStudentName(e.target.value)} className="border px-3 py-2 rounded flex-1" />
        <input type="number" placeholder="Class score" value={classScore} onChange={(e) => setClassScore(e.target.value)} className="border px-3 py-2 rounded w-24" />
        <input type="number" placeholder="Exam score" value={examScore} onChange={(e) => setExamScore(e.target.value)} className="border px-3 py-2 rounded w-24" />
        <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
      </div>

      {marks.length === 0 ? (
        <p className="text-gray-500">No marks added yet.</p>
      ) : (
        <table className="w-full border text-center">
          <thead className="bg-blue-50">
            <tr>
              <th>Name</th>
              <th>Class Score</th>
              <th>Exam Score</th>
              <th>Total</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((m, i) => {
              const total = m.classScore + m.examScore;
              const grade = total >= 80 ? "A" : total >= 70 ? "B" : total >= 60 ? "C" : total >= 50 ? "D" : "F";
              return (
                <tr key={i}>
                  <td>{m.name}</td>
                  <td>{m.classScore}</td>
                  <td>{m.examScore}</td>
                  <td>{total}</td>
                  <td>{grade}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SubjectMarks;
