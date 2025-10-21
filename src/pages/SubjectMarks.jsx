import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { SchoolContext } from "../context/SchoolContext";

const SubjectMarks = () => {
  const { id: classId, subjectName } = useParams();
  const { classes, addOrUpdateStudentMark } = useContext(SchoolContext);

  const currentClass = classes.find((cls) => cls.id === classId);
  const [studentName, setStudentName] = useState("");
  const [scores, setScores] = useState({
    test1: "",
    test2: "",
    group: "",
    project: "",
    exam: "",
  });

  if (!currentClass) return <div>Class not found.</div>;

  const handleAddMark = () => {
    if (!studentName.trim()) return;

    const totalRaw =
      Number(scores.test1) +
      Number(scores.test2) +
      Number(scores.group) +
      Number(scores.project) +
      Number(scores.exam);

    const classScore = Number(scores.test1) + Number(scores.test2) + Number(scores.group) + Number(scores.project);
    const strikedTotal = ((classScore + Number(scores.exam)) / 200) * 100;

    const grade =
      strikedTotal >= 80
        ? "A"
        : strikedTotal >= 70
        ? "B"
        : strikedTotal >= 60
        ? "C"
        : strikedTotal >= 50
        ? "D"
        : "F";

    addOrUpdateStudentMark(classId, subjectName, studentName, {
      ...scores,
      total: totalRaw,
      striked: strikedTotal.toFixed(2),
      grade,
    });

    setStudentName("");
    setScores({ test1: "", test2: "", group: "", project: "", exam: "" });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">
        {currentClass.name} - {subjectName} Marks Entry
      </h2>

      <div className="grid grid-cols-6 gap-2 mb-4">
        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="border px-2 py-1 col-span-2 rounded"
        />
        {["test1", "test2", "group", "project", "exam"].map((key) => (
          <input
            key={key}
            type="number"
            placeholder={key}
            value={scores[key]}
            onChange={(e) => setScores({ ...scores, [key]: e.target.value })}
            className="border px-2 py-1 rounded"
          />
        ))}
      </div>
      <button
        onClick={handleAddMark}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-6"
      >
        Add / Update Mark
      </button>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Student</th>
            <th className="p-2 border">Class Score</th>
            <th className="p-2 border">Exam</th>
            <th className="p-2 border">Total</th>
            <th className="p-2 border">Grade</th>
          </tr>
        </thead>
        <tbody>
          {currentClass.students.map((s, i) => {
            const subjMark = s.marks?.[subjectName];
            if (!subjMark) return null;
            const classScore =
              Number(subjMark.test1) +
              Number(subjMark.test2) +
              Number(subjMark.group) +
              Number(subjMark.project);

            return (
              <tr key={i} className="border-b">
                <td className="p-2 border">{s.name}</td>
                <td className="p-2 border">{classScore}</td>
                <td className="p-2 border">{subjMark.exam}</td>
                <td className="p-2 border">{subjMark.striked}</td>
                <td className="p-2 border">{subjMark.grade}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SubjectMarks;
