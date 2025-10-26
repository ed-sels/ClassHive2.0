import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { SchoolContext } from "../context/SchoolContext";

const SingleReport = () => {
  const { id } = useParams();
  const { classes } = useContext(SchoolContext);
  const currentClass = classes.find((cls) => cls.id === id);

  if (!currentClass) return <p className="text-center text-red-600">Class not found!</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">{currentClass.name} Report</h2>

      {currentClass.subjects.length === 0 ? (
        <p>No subjects added yet.</p>
      ) : (
        currentClass.subjects.map((subj, i) => {
          const marks = currentClass[`${subj}-marks`] || [];
          return (
            <div key={i} className="mb-6">
              <h3 className="text-xl font-semibold mb-2">{subj}</h3>
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
                  {marks.map((m, j) => {
                    const total = m.classScore + m.examScore;
                    const grade = total >= 80 ? "A" : total >= 70 ? "B" : total >= 60 ? "C" : total >= 50 ? "D" : "F";
                    return (
                      <tr key={j}>
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
            </div>
          );
        })
      )}
    </div>
  );
};

export default SingleReport;
