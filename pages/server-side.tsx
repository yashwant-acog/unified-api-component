import withServerFetching from "../components/hoc/withServerFetching"
import Parents from "@/components/parents"
import { Users, GraduationCap, User, ArrowBigLeftDash } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

const ParentsHOC = withServerFetching(Parents, "parents")
const StudentsHOC = withServerFetching(Parents, "students")
const TeachersHOC = withServerFetching(Parents, "teachers")

export const getServerSideProps = async () => {
  const [parentsProps, studentsProps, teachersProps] = await Promise.all([
    ParentsHOC.getServerSideProps(),
    StudentsHOC.getServerSideProps(),
    TeachersHOC.getServerSideProps(),
  ])

  return {
    props: {
      parentsData: parentsProps.props.data,
      studentsData: studentsProps.props.data,
      teachersData: teachersProps.props.data,
    },
  }
}

export default function Home({ parentsData, studentsData, teachersData }: any) {
  const { Component: ParentsComponent } = ParentsHOC
  const { Component: StudentsComponent } = StudentsHOC
  const { Component: TeachersComponent } = TeachersHOC

  const [activeTab, setActiveTab] = useState<"students" | "teachers" | "parents">("students")

  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-indigo-800 mb-2">Server Side Fetching</h1>
      </header>
      <button
        onClick={() => router.push('/')}
        className={`flex items-center px-4 py-2 rounded-full bg-indigo-400 float-right transition-colors duration-200 ease-in-out hover:bg-indigo-600 text-white`}
      >
        <ArrowBigLeftDash className="mr-2 h-5 w-5" />
        View Client Side Fetching
      </button>

      <div className="flex mb-6 space-x-4">
        {[
          { key: "students", label: "Students", icon: <Users className="mr-2 h-5 w-5" /> },
          { key: "teachers", label: "Teachers", icon: <GraduationCap className="mr-2 h-5 w-5" /> },
          { key: "parents", label: "Parents", icon: <User className="mr-2 h-5 w-5" /> },
        ].map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as "students" | "teachers" | "parents")}
            className={`flex items-center px-4 py-2 rounded-full transition-colors duration-200 ease-in-out ${
              activeTab === key
                ? "bg-indigo-600 text-white"
                : "bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
            }`}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>

      {activeTab === "students" && <StudentsComponent data={studentsData} />}
      {activeTab === "teachers" && <TeachersComponent data={teachersData} />}
      {activeTab === "parents" && <ParentsComponent data={parentsData} />}
      
    </div>
  )
}