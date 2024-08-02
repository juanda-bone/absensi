import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destionation: "auth/signin",
        permanent: false,
      },
    };
  }
  return { props: session };
}
