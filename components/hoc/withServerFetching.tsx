import { GetServerSideProps } from "next"

const withServerFetching = (
  Component: React.ComponentType<{ data: any[] }>,
  componentName: string
) => {
  const WrappedComponent = ({ data }: { data: any[] }) => {
    return <Component data={data} />
  }

  return {
    Component: WrappedComponent,
    getServerSideProps: async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/fetch/data?component=${componentName}`)
        const data = await response.json()
        return { props: { data } }
      } catch (error) {
        console.error("Error fetching data:", error)
        return { props: { data: [] } }
      }
    },
  }
}

export default withServerFetching