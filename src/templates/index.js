import React, { lazy, Suspense } from "react";
import { graphql, useStaticQuery } from "gatsby";

import Layout from "../components/layout";
import Hero from "../components/hero";
import { t } from "../data/translations";

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
    <Layout lang={lang}>
      <Hero lang={lang} codes={uniqueCodes} />
      <Suspense
        fallback={
          // role="status" so the wait is announced instead of being silence.
          <p role="status" className="p-6 text-center text-white">
            {t(lang).loading}
          </p>
        }
      >
        <Generator lang={lang} />
      </Suspense>
    </Layout>
  );
};

export default IndexTemplate;
