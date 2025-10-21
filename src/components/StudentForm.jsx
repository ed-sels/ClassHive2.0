import React, { useState } from "react";

export default function StudentForm() {
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Added ${name} from ${className}`);
    setName("");
    setClassName("");
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">Add Student</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded-xl max-w-md">
        <input
          type="text"
          placeholder="Student Name"
          className="w-full border p-2 mb-4 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Class"
          className="w-full border p-2 mb-4 rounded"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Add Student
        </button>
      </form>
    </div>
  );
}
