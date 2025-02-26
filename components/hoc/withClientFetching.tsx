"use client"

import { useEffect, useState } from "react"

export const withClientFetching = (Component: React.ComponentType<{ data: any[] }>, componentName: string) => {
  return function WrappedComponent() {
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/fetch/data?component=${componentName}`)
          const result = await response.json()
          setData(result)
        } catch (error) {
          console.error("Error fetching data:", error)
        } finally {
          setLoading(false)
        }
      }
      fetchData()
    }, [])

    if (loading) {
      return <p>Loading...</p>
    }

    return <Component data={data} />
  }
}

export default withClientFetching