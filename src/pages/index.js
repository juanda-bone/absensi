import { useEffect, useState } from "react";
import axios from "axios";
import { parseCookies, setCookie } from "nookies";
import HomeViews from "@/views/Home";
import api from "@/lib/api";
import AlertModif from "@/views/parts/alert";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Home({
  initialNim,
  initialMahasiswa,
  initialError,
  konfig,
}) {
  const router = useRouter();
  const [nim, setNim] = useState(initialNim || "");
  const [mahasiswa, setMahasiswa] = useState(initialMahasiswa || null);
  const [error, setError] = useState(initialError || null);
  const [loading, setLoading] = useState(false);
  const timestamp = konfig[0].start;
  const [form, setForm] = useState({
    idStudent: initialMahasiswa && initialMahasiswa._id,
    idKehadiran:
      initialMahasiswa &&
      mahasiswa.kehadiran[mahasiswa.kehadiran.length - 1]._id,
    course: konfig[0].idCourse._id,
    absen: "Hadir",
    timestamp: timestamp.substr(0, 10),
    message: null,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState({
    type: "info",
    message: "",
  });
  const [inputToken, setInputToken] = useState("");
  const hadir = initialMahasiswa && [...mahasiswa.kehadiran].reverse();

  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000); // Alert will disappear after 3 seconds
  };

  const updateById = async () => {
    try {
      const result = await api.put(
        "/api/student/absen/findUpdateByIdAbsen",
        form
      );
      setMessageAlert({
        type: "success",
        message: "Absen berhasil diperbarui!",
      });
      handleShowAlert();
    } catch (err) {
      setMessageAlert({ type: "error", message: err.message });
      handleShowAlert();
    }
  };
  const handlerAbsen = (e) => {
    e.preventDefault();

    setLoading(true);
    const currentTime = Math.floor(Date.now() / 1000);
    let konfigEnd = Math.floor(parseFloat(konfig[0].end) / 1000);
    if (konfigEnd < currentTime) {
      setMessageAlert({
        type: "error",
        message: "Maaf waktunya sudah berakhir",
      });
      setLoading(false);

      return handleShowAlert();
    }

    if (konfig[0].token != inputToken) {
      setMessageAlert({ type: "error", message: "Maaf token salah" });
      setLoading(false);

      return handleShowAlert();
    }
    updateById();
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      setCookie(null, "nimValue", nim, {
        maxAge: 6 * 30 * 24 * 60 * 60,
        path: "/",
      });
    } catch (error) {
      setMessageAlert({ type: "error", message: "Maaf ada kesalahan" });
      handleShowAlert();
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Absen 23MA1</title>
      </Head>
      <HomeViews
        nim={nim}
        setNim={setNim}
        handleSubmit={handleSubmit}
        mhs={mahasiswa}
        form={form}
        hadir={hadir}
        loading={loading}
        inputToken={inputToken}
        setInputToken={setInputToken}
        handlerAbsen={handlerAbsen}
        setForm={setForm}
      />
      {showAlert && (
        <AlertModif message={messageAlert.message} type={messageAlert.type} />
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);
  const initialNim = cookies.nimValue || "";

  let initialMahasiswa = null;
  let initialError = null;

  if (initialNim) {
    try {
      const response = await api.get(`/api/student/findNim?nim=${initialNim}`);
      initialMahasiswa = response.data;
    } catch (error) {
      initialError = error.message;
    }
  }

  let konfig = null;
  try {
    const response = await api.get("/api/konfig/getKonfig");
    konfig = response.data;
  } catch (error) {
    initialError = error.message;
  }

  return {
    props: {
      initialNim,
      initialMahasiswa,
      initialError,
      konfig,
    },
  };
}
