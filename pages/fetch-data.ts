import { useState } from "react";

const getData = async (component: string) => {
  const response = await fetch(`/api/fetch/data?component=${component}`);
  return response.json();
};

export default function FetchDataPage() {
  const [data, setData] = useState<any[]>([]);

  const handleFetch = async (component: string) => {
    const result = await getData(component);
    setData(result);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Fetch Data</h1>
      <button onClick={() => handleFetch("students")} className="mr-2 px-4 py-2 bg-blue-500 text-white">
        Get Students
      </button>
      <button onClick={() => handleFetch("teachers")} className="px-4 py-2 bg-green-500 text-white">
        Get Teachers
      </button>
      <pre className="mt-4 p-2 border">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
