import React, { lazy, Suspense } from "react";
import { graphql, useStaticQuery } from "gatsby";

import Layout from "../components/layout";
import Hero from "../components/hero";

const Generator = lazy(() => import("../components/generator"));

const IndexTemplate = ({ lang }) => {
  const data = useStaticQuery(graphql`
    query {
      allCodesJson(sort: { cat: ASC }) {
        nodes {
          id
          cat
          link_href
        }
      }
    }
  `);

  const codes = data.allCodesJson.nodes;
  const uniqueCodes = Array.from(
    new Map(codes.map((item) => [item["link_href"], item])).values(),
  );

  return (
    <Layout>
      <Hero lang={lang} codes={uniqueCodes} />
      <Suspense fallback={<div>isLoading...</div>}>
        <Generator lang={lang} />
      </Suspense>
    </Layout>
  );
};

export default IndexTemplate;
