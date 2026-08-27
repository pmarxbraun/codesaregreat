import * as React from "react";
import { Link } from "gatsby";

import { routes } from "../data/routes";
import { t } from "../data/translations";

const focusRing =
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-red-800";

const Footer = ({ lang = "en" }: { lang?: string }) => {
  const copy = t(lang);

  return (
    <footer className="static bottom-0 left-0 z-20 flex flex-initial flex-col items-baseline justify-between bg-gradient-to-l from-red-700 to-red-800 p-4 text-white lg:sticky lg:flex-row">
      <p className="text-xs">
        © {new Date().getFullYear()}, Built with{" "}
        <a
          href="https://monsitetranquille.fr"
          className={`italic underline ${focusRing}`}
        >
          MonSiteTranquille
        </a>
      </p>
      <div className="flex flex-col gap-3 lg:flex-row">
        {/* The language switcher is the page's real navigation landmark. */}
        <nav aria-label={copy.languageNav}>
          <ul className="flex flex-col gap-3 lg:flex-row">
            {routes.home.map((route) => {
              const isCurrent = route.code === lang;
              return (
                <li key={route.slug}>
                  <Link
                    to={route.slug}
                    // lang + hreflang so the endonym is announced with the
                    // right voice instead of being mangled by the page voice.
                    lang={route.code}
                    hrefLang={route.code}
                    // aria-current, not colour alone (WCAG 1.4.1).
                    aria-current={isCurrent ? "page" : undefined}
                    className={`${focusRing} ${
                      isCurrent ? "font-semibold underline" : "no-underline"
                    }`}
                  >
                    {route.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <p className="hidden lg:inline" aria-hidden="true">
          |
        </p>
        <a
          className={`italic underline ${focusRing}`}
          href="https://github.com/pmarxbraun/codesaregreat"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
          <span className="sr-only"> ({copy.opensNewTab})</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
