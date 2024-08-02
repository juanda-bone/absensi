import { Alert } from "flowbite-react";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ButtonLoading from "./parts/buttonLoading";

export default function HomeViews({
  nim,
  setNim,
  handleSubmit,
  inputToken,
  setInputToken,
  hadir,
  loading,
  mhs,
  handlerAbsen,
  form,
  setForm,
}) {
  const [status, setStatus] = useState("Hadir");
  const [message, setMessage] = useState("");
  function dateId(timestamp) {
    const timeInt = parseInt(timestamp);
    const date = new Date(timeInt * 1000);
    return date.toLocaleString("id-ID", {
      timeZone: "Asia/Makassar", // Zona waktu Makassar
      weekday: "short", // Nama hari
      year: "numeric", // Tahun
      month: "short", // Nama bulan
      day: "numeric", // Tanggal
    });
  }
  const handlerStatus = (e) => {
    e.preventDefault();
    setStatus(e.target.value);
    let message = null;
    if (e.target.value == "Hadir") {
      message = null;
      setMessage("");
      return setForm({ ...form, absen: e.target.value, message });
    }
    setForm({ ...form, absen: e.target.value });
  };
  const handleChangeMessage = (e) => {
    e.preventDefault();
    setForm({ ...form, message: e.target.value });
    setMessage(e.target.value);
  };

  return (
    <>
      <Link href="/adminSet" className="flex flex-row-reverse pr-3 pt-2">
        <Image alt="Profile" src="/profile-user.png" width={50} height={50} />
      </Link>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-6 pt-2 ${inter.className}`}
      >
        <div>
          <form onSubmit={handleSubmit} className="mb-2">
            <div className="mb-6">
              <label
                htmlFor="nim"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                NIM
              </label>
              <input
                type="number"
                id="nim"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="616********"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 "
            >
              Submit
            </button>
            <select
              id="status"
              value={status}
              onChange={(e) => handlerStatus(e)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/2 mx-3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="Hadir" defaultValue>
                Hadir
              </option>
              <option value="Sakit">Sakit</option>
              <option value="Izin">Izin</option>
            </select>
            {loading ? (
              <ButtonLoading classs="focus:outline-none text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" />
            ) : (
              <button
                name="sakit"
                value={status}
                onClick={(e) => handlerAbsen(e)}
                className="focus:outline-none text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Absen
              </button>
            )}
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/2 mx-0  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={inputToken}
              onChange={(e) => setInputToken(e.target.value)}
              placeholder="Masukkan token"
            />
            {status === "Sakit" || status === "Izin" ? (
              <textarea
                placeholder="Masukkan alasan isin atau sakit apa"
                required
                value={message}
                onChange={(e) => handleChangeMessage(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></textarea>
            ) : null}
          </form>

          <div className="w-full  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center py-6">
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {mhs ? mhs.nama : "Nim tidak ditemukan"}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {mhs ? "23MA1" : "Not Found"}
              </span>
            </div>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-black dark:text-white">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    No
                  </th>
                  <th scope="col " className="px-6 py-3">
                    Tanggal
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Mata Kuliah
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Absen
                  </th>
                </tr>
              </thead>
              <tbody>
                {hadir &&
                  hadir.map((absen, index) => (
                    <tr
                      key={index}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {index + 1}
                      </th>
                      <td className="px-6 py-4">{dateId(absen.timestamp)}</td>
                      <td className="px-6 py-4">{absen.course.mataKuliah}</td>
                      <td className="px-6 py-4">{absen.absen}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
