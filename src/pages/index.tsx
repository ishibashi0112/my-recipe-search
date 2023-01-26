import { GetServerSideProps, NextPage } from "next";
import React from "react";

import { adminAuth } from "@/lib/firebase/server";
import { IndexBody } from "@/pages-component/Index/IndexBody";
import { Layout } from "@/pages-layout/layout";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const sessionCookie = ctx.req.cookies.session || "";

  const user = await adminAuth
    .verifySessionCookie(sessionCookie, true)
    .catch(() => null);

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const Home: NextPage = () => {
  return (
    <Layout>
      <IndexBody />
    </Layout>
  );
};

export default Home;
