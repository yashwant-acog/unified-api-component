const Students = ({
  data,
}: {
  data: { id: number; name: string; age: number }[];
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {data.map((student) => (
      <div
        key={student.id}
        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
      >
        <h3 className="text-xl font-semibold mb-2 text-indigo-800">
          {student.name}
        </h3>
        <p className="text-indigo-600">Age: {student.age}</p>
      </div>
    ))}
  </div>
);

export default Students;
