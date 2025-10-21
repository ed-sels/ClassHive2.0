import React from "react";
import { useParams, Link } from "react-router-dom";

const SingleReport = () => {
  const { id } = useParams();

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-3xl font-bold mb-4">Student Report #{id}</h2>
      <p>This page will display the student’s report card in detail.</p>
      <Link
        to="/marks"
        className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Back to Marks
      </Link>
    </div>
  );
};

export default SingleReport;
