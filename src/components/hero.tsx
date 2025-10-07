import * as React from "react";
import { SearchCombobox } from "./search-combobox";

const translations = {
  en: {
    title: "Discover Netflix's Secret Categories",
    subtitle: "Find Your Perfect Show in Seconds, Not Hours",
    searchPlaceholder: "Select TV show or movie genre",
  },
  es: {
    title: "Descubre las Categorías Ocultas de Netflix al Instante",
    subtitle: "Encuentra tu Programa Perfecto en Segundos, No Horas",
    searchPlaceholder: "Seleccione el género de la película",
  },
  fr: {
    title: "Découvrez les catégories cachées de Netflix",
    subtitle:
      "Trouvez votre émission parfaite en quelques secondes, pas en heures",
    searchPlaceholder: "Sélectionnez un genre",
  },
  de: {
    title: "Entdecken Sie die versteckten Kategorien von Netflix",
    subtitle: "Finden Sie Ihre perfekte Show in Sekunden, nicht Stunden",
    searchPlaceholder: "Wählen Sie das Filmgenre",
  },
  ar: {
    title: "اكتشف الفئات الخفية في نتفليكس",
    subtitle: "ابحث عن البرنامج المثالي في ثوانٍ وليس ساعات",
    searchPlaceholder: "اختر نوع الفيلم",
  },
};

export default function Hero({ lang, codes }) {
  return (
    <div className="relative isolate mb-7 overflow-hidden bg-red-700">
      <div className="px-6 py-8 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-7xl">
            {translations[lang].title}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-gray-50/70 lg:text-2xl">
            {translations[lang].subtitle}
          </p>
          <div className="mx-auto mt-8 max-w-2xl">
            <SearchCombobox
              codes={codes}
              placeholder={translations[lang].searchPlaceholder}
            />
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
