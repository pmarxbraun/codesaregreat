import React, { useState, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

import { t } from "../data/translations";

interface Code {
  id: string;
  cat: string;
  link_href: string;
}

const Generator = ({ lang }: { lang: string }) => {
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

  const copy = t(lang);

  const codes: Code[] = data.allCodesJson.nodes;
  const uniqueCodes: Code[] = Array.from(
    new Map(codes.map((item) => [item["link_href"], item])).values(),
  ) as Code[];

  const getColumns = () => {
    if (typeof window === "undefined") return 5;
    if (window.innerWidth >= 1024) return 5;
    if (window.innerWidth >= 768) return 3;
    return 1;
  };

  const [columns, setColumns] = useState(5);

  useEffect(() => {
    setColumns(getColumns());
    const handleResize = () => setColumns(getColumns());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const rowCount = Math.ceil(uniqueCodes.length / columns);

  const virtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => 200,
    overscan: 5,
  });

  const items = virtualizer.getVirtualItems();

  return (
    // id + aria-labelledby turn this into a named landmark, so it is both the
    // skip-link target and reachable via rotor/landmark navigation. A bare
    // <section> maps to role="generic" and is invisible to assistive tech.
    <section
      id="categories"
      // tabIndex -1 so the skip link actually MOVES focus here rather than
      // only scrolling; sections are not focusable by default.
      tabIndex={-1}
      aria-labelledby="categories-heading"
      className="w-full focus:outline-none"
    >
      <h2 id="categories-heading" className="sr-only">
        {copy.categoriesHeading}
      </h2>
      {/* Virtualization is invisible to a screen reader: without this, the
          list appears to end at whatever is currently rendered. */}
      <p className="sr-only">{copy.categoriesIntro(uniqueCodes.length)}</p>
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        <div
          className="grid gap-3 px-3 md:grid-cols-3 lg:grid-cols-5 lg:px-7"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            transform: `translateY(${items[0]?.start ?? 0}px)`,
          }}
        >
          {items.map((virtualRow) => {
            const startIndex = virtualRow.index * columns;
            const rowItems = uniqueCodes.slice(
              startIndex,
              startIndex + columns
            );

            return rowItems.map((code) => (
              <a
                href={code.link_href}
                target="_blank"
                rel="noopener noreferrer"
                key={code.id}
                className="group flex flex-col items-center justify-between gap-y-3 rounded-lg bg-gradient-to-br from-red-900 via-red-800 to-red-900 p-3 py-7 text-center shadow transition-all hover:cursor-pointer hover:from-red-800 hover:via-red-900 hover:to-red-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-red-700"
              >
                {/* h3: sits under the section's h2, which sits under the page h1. */}
                {/* Category names are English data from Netflix. Without an
                    explicit direction the bidi algorithm reorders them inside
                    an RTL page ("90-Minute Movies" -> "Minute Movies-90"). */}
                <h3
                  lang="en"
                  dir="ltr"
                  className="text-lg font-medium leading-6 tracking-tight text-gray-100"
                >
                  {code.cat}
                </h3>
                <span className="inline-flex items-center rounded-lg bg-red-700 px-3 py-2 text-center text-xs font-medium text-white ring-0 ring-inset transition-all group-hover:bg-red-800 group-hover:ring-1 group-hover:ring-white/25">
                  {copy.goToCategory}
                  <svg
                    className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </span>
                {/* Outside the <h3> so heading navigation is not flooded with
                    the parenthetical on all 1658 cards. */}
                <span className="sr-only">({copy.opensNewTab})</span>
              </a>
            ));
          })}
        </div>
      </div>
    </section>
  );
};

export default Generator;
