import React, { useState, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

// Define the structure for a Code node
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
    <section className="w-full">
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
            const rowItems = uniqueCodes.slice(startIndex, startIndex + columns);

            return rowItems.map((code) => (
              <a
                href={code.link_href}
                target="_blank"
                key={code.id}
                className="group flex flex-col items-center justify-between gap-y-3 rounded-lg bg-gradient-to-br from-red-900 via-red-800 to-red-900 p-3 py-7 text-center shadow transition-all hover:cursor-pointer hover:from-red-800 hover:via-red-900 hover:to-red-800 dark:border-gray-700 dark:bg-gray-800"
              >
                <h2 className="text-lg font-medium leading-6 tracking-tight text-gray-100 dark:text-white">
                  {code.cat}
                </h2>
                <p className="inline-flex items-center rounded-lg bg-red-700 px-3 py-2 text-center text-xs font-medium text-white ring-0 ring-inset transition-all focus:outline-none focus:ring-2 group-hover:bg-red-800 group-hover:ring-1 group-hover:ring-white/25 group-focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                  Go to categorie
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
                </p>
              </a>
            ));
          })}
        </div>
      </div>
    </section>
  );
};

export default Generator;
