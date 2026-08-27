import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

import { t } from "../data/translations";

const Header = ({ lang = "en" }: { lang?: string }) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const { title } = data.site.siteMetadata;
  const copy = t(lang);

  return (
    // <header>, not <nav>: this bar is a banner, not a set of navigation
    // links. The site title is a <span>, not an <h1> — the page's single <h1>
    // belongs to the Hero.
    <header className="flex flex-initial items-baseline gap-x-2 bg-gradient-to-l from-red-700 to-red-800 p-6 text-white shadow-md">
      <a
        href="#categories"
        className="sr-only rounded-md bg-white px-4 py-2 font-medium text-red-800 focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
      >
        {copy.skipToContent}
      </a>
      <Link
        to="/"
        className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-red-800"
      >
        <span className="text-2xl font-bold">{title}</span>
      </Link>
    </header>
  );
};

export default Header;
