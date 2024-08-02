import Link from "next/link";
import React, { useState, useEffect } from "react";

const AttendanceTable = ({ students }) => {
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    if (selectedCourseId) {
      const filtered = students
        .map((student) => {
          return {
            ...student,
            kehadiran: student.kehadiran.filter(
              (attendance) => attendance.course._id === selectedCourseId
            ),
          };
        })
        .filter((student) => student.kehadiran.length > 0)
        .sort((a, b) => a.nim.localeCompare(b.nim));
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(students);
    }
  }, [selectedCourseId, students]);

  const uniqueCourses = students
    ? [
        ...new Map(
          students.flatMap((student) =>
            student.kehadiran.map((kehadiran) => [
              kehadiran.course._id,
              kehadiran.course,
            ])
          )
        ).values(),
      ]
    : [];

  return (
    <>
      <div className="flex justify-end mx-4 my-3">
        <Link
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
          href="/"
        >
          Home
        </Link>
        <Link
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 mr-2"
          href="/adminSet"
        >
          Buat Konfigurasi
        </Link>
      </div>
      <div className="p-4 shadow-lg rounded-lg bg-white">
        <label
          htmlFor="course-select"
          className="block text-lg font-bold text-gray-800 mb-2"
        >
          Pilih Mata Kuliah
        </label>
        <select
          id="course-select"
          className="mb-4 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
        >
          <option value="">--Select Course--</option>
          {uniqueCourses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.mataKuliah} | {course.dosen}
            </option>
          ))}
        </select>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider border">
                  Nama Mahasiswa
                </th>
                {/* Tambahkan header tanggal sesuai dengan data kehadiran */}
                {filteredStudents.length > 0 &&
                  filteredStudents[0].kehadiran.map((_, index) => (
                    <th
                      key={index}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider border"
                    >
                      Tanggal {index + 1}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                    {student.nama}
                  </td>
                  {student.kehadiran.map((kehadiran, index) => (
                    <td
                      key={index}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border"
                    >
                      {kehadiran.absen}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AttendanceTable;
