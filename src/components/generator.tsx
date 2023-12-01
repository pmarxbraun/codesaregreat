import React, { useMemo, useState, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";
import InfiniteScroll from "react-infinite-scroller";

// Define the structure for the localization strings
interface LocalizationStrings {
  [key: string]: {
    placeholder: string;
    noOptionsMessage: string;
    emptySearch: string;
  };
}

// Define the structure for a Code node
interface Code {
  id: string;
  cat: string;
  link_href: string;
}

const strings: LocalizationStrings = {
  en: {
    placeholder: "Search TV show or movie genre",
    noOptionsMessage: "No category found for this search",
    emptySearch:
      "Please choose a movie genre above like 'Action', 'Comedy', or 'Sci-Fi'",
  },
  es: {
    placeholder: "Busque el género de la película",
    noOptionsMessage: "No se encontró ninguna categoría para esta búsqueda",
    emptySearch:
      "Elija uno de los géneros de películas anteriores, como 'Acción', 'Comedia' o 'Ciencia ficción'.",
  },
  de: {
    placeholder: "Durchsuchen Sie das Filmgenre oder tippen Sie",
    noOptionsMessage: "Keine Kategorie für diese Suche gefunden",
    emptySearch:
      "Bitte wählen Sie oben ein Filmgenre wie 'Action', 'Comedy' oder 'Sci-Fi' aus.",
  },
  fr: {
    placeholder: "Recherchez un genre",
    noOptionsMessage:
      "Ooops nous n'avons pas trouvé de catégorie pour cette recherche",
    emptySearch:
      "Recherchez une catégorie telle que 'Comédie', 'Action' ou 'Science Fiction'",
  },
  ar: {
    placeholder: "ابحث عن نوع الفيلم أو انقر لاستخدام القائمة المنسدلة",
    noOptionsMessage: "لم يتم العثور على فئة لهذا البحث",
    emptySearch:
      "الرجاء اختيار نوع فيلم أعلاه ، مثل 'حركة' أو 'كوميديا' أو'خيال علمي",
  },
};

const Generator = ({ lang }: { lang: keyof LocalizationStrings }) => {
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

  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState<Code[]>([]);
  const itemsPerPage = 28;

  const filteredCodes = useMemo(() => {
    return searchTerm
      ? codes.filter((node: Code) =>
          node.cat.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : codes;
  }, [codes, searchTerm]);

  useEffect(() => {
    setItems(filteredCodes.slice(0, itemsPerPage));
  }, [filteredCodes]);

  const loadMore = (page: number) => {
    const startIndex = page * itemsPerPage;
    const newItems: Code[] = filteredCodes.slice(
      startIndex,
      startIndex + itemsPerPage,
    );
    setItems((prevItems: Code[]) => [...prevItems, ...newItems]);
  };

  return (
    <div className="flex flex-col gap-y-10 px-7 [&_>div:nth-child(2)]:grid [&_>div:nth-child(2)]:gap-2 md:[&_>div:nth-child(2)]:grid-cols-3 lg:[&_>div:nth-child(2)]:grid-cols-5">
      <input
        type="search"
        placeholder={strings[lang]?.placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mx-auto w-full max-w-5xl rounded-md border border-gray-500/25 p-2 py-4 pl-3 text-3xl"
      />

      {filteredCodes.length > 0 ? (
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={items.length < filteredCodes.length}
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
        >
          {items.map((code: Code) => (
            <div
              key={code.id}
              className="flex max-w-sm flex-col items-start justify-between rounded-lg border border-gray-200 bg-white p-3  shadow dark:border-gray-700 dark:bg-gray-800"
            >
              <a href={code.link_href} target="_blank">
                <h2 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                  {code.cat}
                </h2>
              </a>
              <a
                href={code.link_href}
                className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Read more
                <svg
                  className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          ))}
        </InfiniteScroll>
      ) : (
        <div>{strings[lang]?.emptySearch}</div>
      )}
    </div>
  );
};

export default Generator;
