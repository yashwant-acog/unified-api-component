const Dummy = ({
    data,
  }: {
    data: { userId: number; id: number; title: string; completed: boolean }[];
  }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <div
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <h3 className="text-xl font-semibold mb-2 text-green-800">
                {data.userId}
              </h3>
              <p className="text-green-600">Title: {data.title}</p>
            </div>
        </div>
      );
  }
  
  export default Dummy;  