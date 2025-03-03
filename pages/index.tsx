"use client";

import { useState } from "react";
import {
  Users,
  GraduationCap,
  User,
  LucideView,
  ArrowBigRightDash,
  DrumIcon
} from "lucide-react";
import { withClientFetching } from "../components/hoc/withClientFetching";
import Students from "../components/students";
import Teachers from "../components/teachers";
import Parents from "../components/parents";
import { useRouter } from "next/router";
import { Data } from "@/lib/data";
import Dummy from "@/components/dummmy";

const dataManager = new Data();

const StudentData = withClientFetching(Students, () => dataManager.fetchFromSource("json","students"));
const ParentData = withClientFetching(Parents, () => dataManager.fetchData("parents"));
const TeacherData = withClientFetching(Teachers, () => dataManager.fetchData("teachers"));
const DummyData = withClientFetching(Dummy, () => dataManager.fetchFromSource("api","https://jsonplaceholder.typicode.com/todos/1"));


export default function Home() {
  const [activeTab, setActiveTab] = useState<
    "students" | "teachers" | "parents" | "dummy"
  >("students");
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-indigo-800 mb-2">
          Client Side Fetching
        </h1>
      </header>
      <button
        onClick={() => router.push('/server-side')}
        className={`flex items-center px-4 py-2 rounded-full bg-indigo-400 float-right transition-colors duration-200 ease-in-out hover:bg-indigo-600 text-white`}
      >
        View Server Side Fetching
        <ArrowBigRightDash className="ml-2 h-5 w-5" />
      </button>

      <div className="flex mb-6 space-x-4">
        {[
          {
            key: "students",
            label: "Students",
            icon: <Users className="mr-2 h-5 w-5" />,
          },
          {
            key: "teachers",
            label: "Teachers",
            icon: <GraduationCap className="mr-2 h-5 w-5" />,
          },
          {
            key: "parents",
            label: "Parents",
            icon: <User className="mr-2 h-5 w-5" />,
          },
          {
            key: "dummy",
            label: "Dummy",
            icon: <DrumIcon className="mr-2 h-5 w-5" />,
          }
        ].map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() =>
              setActiveTab(key as "students" | "teachers" | "parents")
            }
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

      {activeTab === "students" && <StudentData />}
      {activeTab === "teachers" && <TeacherData />}
      {activeTab === "parents" && <ParentData />}
      {activeTab === "dummy" && <DummyData />}
    </div>
  );
}
