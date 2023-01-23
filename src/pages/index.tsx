import { NextPage } from "next";
import React from "react";

import { IndexBody } from "@/pages-component/Index/IndexBody";
import { Layout } from "@/pages-layout/layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <IndexBody />
    </Layout>
  );
};

export default Home;
