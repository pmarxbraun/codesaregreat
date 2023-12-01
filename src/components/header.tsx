import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

const Header = () => {
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

  return (
    <nav className="flex flex-initial items-baseline gap-x-2 bg-gradient-to-l from-red-600  to-red-700 p-6 text-gray-100 shadow-md">
      <Link to="/">
        <h1>{title}</h1>
      </Link>
    </nav>
  );
};

export default Header;
