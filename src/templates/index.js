import React, { lazy, Suspense } from "react";

import Layout from "../components/layout";
import Hero from "../components/hero";

const Generator = lazy(() => import("../components/generator"));

const IndexTemplate = ({ lang }) => {
  return (
    <Layout lang={lang}>
      <Hero />
      <Suspense fallback={<div>isLoading...</div>}>
        <Generator lang={lang} />
      </Suspense>
    </Layout>
  );
};

export default IndexTemplate;
