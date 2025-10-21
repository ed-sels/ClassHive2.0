export default function Home() {
  return (
    <div className="text-center mt-20">
      <h2 className="text-3xl font-bold mb-4">Welcome to ClassHive 2.0</h2>
      <p className="text-lg text-gray-600 mb-8">
        Manage student grades, generate reports, and track performance easily.
      </p>
      <div className="flex justify-center space-x-6">
        <a href="/marks" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">Enter Marks</a>
        <a href="/reports" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">Generate Reports</a>
        <a href="/dashboard" className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">View Dashboard</a>
      </div>
    </div>
  );
}
