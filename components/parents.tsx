const Parents = ({
  data,
}: {
  data: { id: number; name: string; children: number }[];
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {data.map((parent) => (
      <div
        key={parent.id}
        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
      >
        <h3 className="text-xl font-semibold mb-2 text-green-800">
          {parent.name}
        </h3>
        <p className="text-green-600">Children: {parent.children}</p>
      </div>
    ))}
  </div>
);

export default Parents;
