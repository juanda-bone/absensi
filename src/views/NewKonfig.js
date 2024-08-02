import api from "@/lib/api";
import randomToken from "@/lib/randomToken";
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function KonfigViews({ handleLogout, mataKuliah, config }) {
  const router = useRouter();
  const time = new Date();
  const [expired, setExpired] = useState();
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [token, setToken] = useState(randomToken());
  const [form, setForm] = useState({
    id: "6682d22defaa62d8c6cc42e4",
    token,
    start: `${time.getTime()}`,
    end: `${time.getTime() + 2 * 60 * 60 * 1000}`,
  });

  const timestamp = new Date().getTime();
  useEffect(() => {
    config.end < timestamp ? setExpired(true) : setExpired(false);
  }, []);

  function formatTimestamp(timestamp) {
    let date = parseInt(timestamp);

    date = new Date(date); // Ubah ke milidetik
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false, // Gunakan format 24 jam
    };
    return date.toLocaleDateString("id-ID", options);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.id === "") {
      return alert("Pilih Mata Kuliah");
    }
    let str = form.start;
    const res = await api.put(`/api/konfig/findUpdateById`, form);
    await api.post("/api/konfig/updateManyAbsen", {
      idCourse: form.idCourse,
      timestamp: str.substr(0, 10),
    });
    if (res) {
      router.push("/adminSet");
    }
  };

  const startHandler = (e) => {
    let value = e.target.value;
    if (e.target.name == "token") {
      setToken(e.target.value);
    } else if (e.target.name == "idCourse") {
      setForm({ ...form, [e.target.name]: `${value}` });
    } else {
      let timeValue = e.target.value;
      e.target.name == "start" ? setStart(timeValue) : setEnd(timeValue);
      // Buat tanggal saat ini dan ubah waktu berdasarkan input
      const date = new Date();
      const [hours, minutes] = timeValue.split(":");
      date.setHours(hours);
      date.setMinutes(minutes);
      date.setSeconds(0);

      // Dapatkan nilai timestamp
      value = date.getTime();
    }

    setForm({ ...form, [e.target.name]: `${value}` });
  };

  return (
    <>
      <div className=" bg-gray-100 min-h-screen  p-5">
        <div className="flex justify-end mb-4">
          <Link
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
            href="/"
          >
            Home
          </Link>
          <Link
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 mr-2"
            href="/adminSet/showTable"
          >
            Tampilkan Absen
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
        <form
          className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-gray-700">Mata Kuliah</label>
            <select
              className="w-full px-3 py-2 border rounded"
              onChange={(e) => startHandler(e)}
              name="idCourse"
              required
            >
              <option value="" disabled hidden selected>
                Pilih Mata Kuliah
              </option>
              {mataKuliah.map((course, i) => (
                <option
                  value={course._id}
                  key={i}
                >{`${course.mataKuliah} | ${course.dosen}`}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Jam Mulai</label>
            <input
              type="time"
              className="w-full px-3 py-2 border rounded"
              value={start}
              name="start"
              onChange={(e) => startHandler(e)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Jam Selesai</label>
            <input
              type="time"
              name="end"
              className="w-full px-3 py-2 border rounded"
              value={end}
              onChange={(e) => startHandler(e)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Token</label>
            <input
              type="text"
              name="token"
              className="w-full px-3 py-2 border rounded"
              value={token}
              onChange={(e) => startHandler(e)}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              type="submit"
            >
              Simpan
            </button>
          </div>
        </form>
        <div
          className={`${
            expired ? "bg-red-300" : "bg-white"
          } rounded-lg shadow-md p-6 max-w-md mx-auto mb-4`}
        >
          <h2 className="text-xl font-bold mb-2">
            {config.idCourse.mataKuliah}
          </h2>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Dosen:</span>{" "}
            {config.idCourse.dosen}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Hari:</span> {config.idCourse.hari}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Jam:</span> {config.idCourse.jam}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Token:</span> {config.token}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Start:</span>{" "}
            {formatTimestamp(config.start)}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">End:</span>{" "}
            {formatTimestamp(config.end)}
          </p>
        </div>
      </div>
    </>
  );
}
