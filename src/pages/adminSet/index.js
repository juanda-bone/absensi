import { getSession, signOut } from "next-auth/react";
import KonfigViews from "@/views/NewKonfig";
import api from "@/lib/api";
import Head from "next/head";
const AdminSet = ({ session, err, mataKuliah, config }) => {
  const handleClick = () => {
    signOut();
  };

  return (
    <>
      <Head>
        <title>Konfigurasi 23MA1</title>
      </Head>
      <KonfigViews
        handleLogout={handleClick}
        mataKuliah={mataKuliah}
        config={config}
      />
    </>
  );
};

export default AdminSet;

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

  let mataKuliah = null;
  let err = null;
  try {
    const response = await api.get("/api/course/getCourse");
    mataKuliah = response.data;
  } catch (error) {
    err = error.message;
  }

  let config = null;
  try {
    const response = await api.get("/api/konfig/getKonfig");
    config = response.data[0];
  } catch (error) {
    err.message;
  }

  return {
    props: { session, err, mataKuliah, config },
  };
}
