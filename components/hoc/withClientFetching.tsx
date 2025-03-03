"use client";

import { useEffect, useState } from "react";

// Accepts a function that returns a Promise
export const withClientFetching = (
  Component: React.ComponentType<{ data: any[] }>,
  fetchFunction: () => Promise<any>,
  url?: string
) => {
  return function WrappedComponent() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const result = url? await fetch(`${url}`) : await fetchFunction(); // Call the function here
          url? setData(await result.json()) : setData(result);
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