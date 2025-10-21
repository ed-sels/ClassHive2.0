import { useState } from "react";

export default function GradeForm({ student, onAddGrade }) {
  const [subject, setSubject] = useState("");
  const [score, setScore] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject || !score) return;
    onAddGrade(student.id, { subject, score, comment });
    setSubject("");
    setScore("");
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md mt-4">
      <h3 className="text-lg font-semibold mb-2">Add Grade for {student.name}</h3>
      <input
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <input
        placeholder="Score"
        type="number"
        value={score}
        onChange={(e) => setScore(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <textarea
        placeholder="Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      ></textarea>
      <button className="bg-green-600 text-white px-4 py-2 rounded">Add Grade</button>
    </form>
  );
}
