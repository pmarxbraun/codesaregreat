import React, { useRef, useState, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";
import InfiniteScroll from "react-infinite-scroller";
import { DebounceInput } from "react-debounce-input";

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
  const inputRef = useRef<HTMLInputElement>(null);
  const codes = data.allCodesJson.nodes;

  const scrollToInput = () => {
    if (inputRef.current) {
      const headerOffset = 70; // Adjust this value based on your header's height
      const elementPosition = inputRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      input.addEventListener("focus", scrollToInput);
    }

    return () => {
      if (input) {
        input.removeEventListener("focus", scrollToInput);
      }
    };
  }, []);

  const itemsPerPage = 20;
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState<Code[]>([]);

  // Modify the onChange handler for the input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // If the input is being cleared, do not call scrollToInput
    if (inputRef.current) {
      if (
        value.length > 0 &&
        !inputRef.current.contains(document.activeElement)
      ) {
        scrollToInput();
      }
    }
  };

  useEffect(() => {
    setItems(
      codes.filter((node: Code) =>
        node.cat.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [searchTerm]);

  useEffect(() => {
    setItems(codes.slice(0, itemsPerPage));
  }, []);

  const loadMore = (page: number) => {
    const startIndex = page * itemsPerPage;
    const newItems: Code[] = codes.slice(startIndex, startIndex + itemsPerPage);
    setItems((prevItems: Code[]) => [...prevItems, ...newItems]);
  };

  return (
    <div className="flex flex-col gap-y-10 px-3 lg:px-7 [&_>div:nth-child(2)]:grid [&_>div:nth-child(2)]:auto-rows-max [&_>div:nth-child(2)]:gap-2 md:[&_>div:nth-child(2)]:grid-cols-3 lg:[&_>div:nth-child(2)]:grid-cols-5">
      <DebounceInput
        inputRef={inputRef}
        minLength={3}
        debounceTimeout={300}
        onChange={handleInputChange}
        value={searchTerm}
        className="mx-auto w-full max-w-5xl rounded-md border border-gray-500/25 p-2 py-4 pl-3 text-base lg:text-3xl"
        placeholder={strings[lang]?.placeholder}
      />
      {/* <input
        ref={inputRef}
        type="search"
        placeholder={strings[lang]?.placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        className="mx-auto w-full max-w-5xl rounded-md border border-gray-500/25 p-2 py-4 pl-3 text-base lg:text-3xl"
      /> */}

      {items.length > 0 ? (
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={items.length < codes.length}
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
        >
          {items.map((code: Code) => (
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
          ))}
        </InfiniteScroll>
      ) : (
        <div className="m-auto !block min-h-screen max-w-sm text-center text-white">
          {strings[lang]?.emptySearch}
        </div>
      )}
    </div>
  );
};

export default Generator;
