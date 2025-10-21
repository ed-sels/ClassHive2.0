export default function StudentList({ students, onSelect }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-semibold mb-3">Students</h2>
      <ul>
        {students.map((s) => (
          <li
            key={s.id}
            onClick={() => onSelect(s)}
            className="cursor-pointer border-b py-2 hover:bg-gray-100"
          >
            {s.name} — {s.class}
          </li>
        ))}
      </ul>
    </div>
  );
}
