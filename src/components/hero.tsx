import * as React from "react";
import { SearchCombobox } from "./search-combobox";
import { t } from "../data/translations";

export default function Hero({ lang, codes }) {
  const copy = t(lang);

  return (
    <div className="relative isolate mb-7 overflow-hidden bg-red-700">
      <div className="px-6 py-8 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-7xl">
            {copy.title}
          </h1>
          {/* was text-gray-50/70 -> 3.65:1 on red-700, below the 4.5:1 AA
              threshold at the mobile 16px size. */}
          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-red-50 lg:text-2xl">
            {copy.subtitle}
          </p>
          <div className="mx-auto mt-8 max-w-2xl">
            <SearchCombobox codes={codes} lang={lang} />
          </div>
        </div>
      </div>
      <svg
        viewBox="0 0 1024 1024"
        className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
        aria-hidden="true"
      >
        <circle
          cx={512}
          cy={512}
          r={512}
          fill="url(#8d958450-c69f-4251-94bc-4e091a323369)"
          fillOpacity="0.7"
        />
        <defs>
          <radialGradient id="8d958450-c69f-4251-94bc-4e091a323369">
            <stop stopColor="#7775D6" />
            <stop offset={1} stopColor="#E935C1" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
