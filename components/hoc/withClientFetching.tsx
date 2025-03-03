"use client";

import { useEffect, useState } from "react";

// Accepts a function that returns a Promise
export const withClientFetching = (
  Component: React.ComponentType<{ data: any[] }>,
  fetchFunction: () => Promise<any>
) => {
  return function WrappedComponent() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const result = await fetchFunction(); // Call the function here
          setData(result);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, []);

    if (loading) {
      return <p>Loading...</p>;
    }

    return <Component data={data} />;
  };
};

export default withClientFetching;