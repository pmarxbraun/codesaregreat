import * as React from "react";
import { Link } from "gatsby";

import { routes } from "../data/routes";

const Footer = () => (
  <footer className="static bottom-0 left-0 z-20 flex flex-initial flex-col items-baseline justify-between bg-gradient-to-l from-red-600 to-red-700 p-4 lg:sticky lg:flex-row">
    <p className="text-xs text-gray-100">
      © {new Date().getFullYear()}, Built with{" "}
      <a href="https://monsitetranquille.fr" className="italic">
        MonSiteTranquille
      </a>
    </p>
    <div className="flex flex-col gap-3 lg:flex-row">
      <div className="flex flex-col gap-3 lg:flex-row">
        {routes.home.map((string) => (
          <Link
            key={string.slug}
            to={`${string.slug}`}
            activeClassName="text-gray-100"
          >
            {string.label}
          </Link>
        ))}
      </div>
      <p className="hidden lg:inline">|</p>
      <a
        className="italic text-black"
        href="https://github.com/pmarxbraun/codesaregreat"
        target="_blank"
        rel="noreferrer"
      >
        Github
      </a>
    </div>
  </footer>
);

export default Footer;
