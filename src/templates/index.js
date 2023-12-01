import React, { lazy, Suspense } from "react";

import Layout from "../components/layout";
import Hero from "../components/hero";

const Generator = lazy(() => import("../components/generator"));

const IndexTemplate = ({ lang }) => {
  return (
    <Layout>
      <Hero lang={lang} />
      <Suspense fallback={<div>isLoading...</div>}>
        <Generator lang={lang} />
      </Suspense>
    </Layout>
  );
};

export default IndexTemplate;
