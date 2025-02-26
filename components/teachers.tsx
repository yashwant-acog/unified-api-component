const Teachers = ({
  data,
}: {
  data: { id: number; name: string; subject: string }[];
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {data.map((teacher) => (
      <div
        key={teacher.id}
        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
      >
        <h3 className="text-xl font-semibold mb-2 text-purple-800">
          {teacher.name}
        </h3>
        <p className="text-purple-600">Subject: {teacher.subject}</p>
      </div>
    ))}
  </div>
);

export default Teachers;
