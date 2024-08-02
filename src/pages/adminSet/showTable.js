import api from "@/lib/api";
import { getSession } from "next-auth/react";
import Head from "next/head";

const { default: AttendanceTable } = require("@/views/viewTable");

const ShowTable = ({ session, students, errorMessage, courses }) => {
  return (
    <>
      <Head>
        <title>Table absen 23MA1</title>
      </Head>
      <AttendanceTable courses={courses} students={students} />
    </>
  );
};

export default ShowTable;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  let courses = null;
  let errorMessage = null;
  let students = null;
  try {
    const resultCourses = await api.get("/api/course/getCourse");
    courses = resultCourses.data;
    const resultStudents = await api.get("/api/student/getStudent");
    students = resultStudents.data;
  } catch (error) {
    errorMessage = error.message;
  }

  return { props: { session, courses, students, errorMessage } };
}
