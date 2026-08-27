export interface Translation {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  /** Accessible name for the search combobox. `role="combobox"` forbids
   * name-from-content, so the visible text is NOT used as the label. */
  searchLabel: string;
  skipToContent: string;
  categoriesHeading: string;
  /** Screen readers cannot see that the grid is virtualized, so state the
   * real total and that more rows arrive on scroll. */
  categoriesIntro: (n: number) => string;
  goToCategory: string;
  opensNewTab: string;
  languageNav: string;
  results: (n: number) => string;
  noResults: string;
  loading: string;
  popularHeading: string;
  searchResultsHeading: string;
}

export const translations: Record<string, Translation> = {
  en: {
    title: "Discover Netflix's Secret Categories",
    subtitle: "Find Your Perfect Show in Seconds, Not Hours",
    searchPlaceholder: "Select TV show or movie genre",
    searchLabel: "Search Netflix categories",
    skipToContent: "Skip to categories",
    categoriesHeading: "All Netflix categories",
    categoriesIntro: (n) => `${n} categories. More load as you scroll.`,
    goToCategory: "Go to category",
    opensNewTab: "opens in a new tab",
    languageNav: "Language",
    results: (n) => `${n} categories found`,
    noResults: "No categories found.",
    loading: "Loading categories…",
    popularHeading: "Popular categories",
    searchResultsHeading: "Search results",
  },
  es: {
    title: "Descubre las Categorías Ocultas de Netflix al Instante",
    subtitle: "Encuentra tu Programa Perfecto en Segundos, No Horas",
    searchPlaceholder: "Seleccione el género de la película",
    searchLabel: "Buscar categorías de Netflix",
    skipToContent: "Saltar a las categorías",
    categoriesHeading: "Todas las categorías de Netflix",
    categoriesIntro: (n) => `${n} categorías. Se cargan más al desplazarte.`,
    goToCategory: "Ir a la categoría",
    opensNewTab: "se abre en una pestaña nueva",
    languageNav: "Idioma",
    results: (n) => `${n} categorías encontradas`,
    noResults: "No se encontraron categorías.",
    loading: "Cargando categorías…",
    popularHeading: "Categorías populares",
    searchResultsHeading: "Resultados de búsqueda",
  },
  fr: {
    title: "Découvrez les catégories cachées de Netflix",
    subtitle:
      "Trouvez votre émission parfaite en quelques secondes, pas en heures",
    searchPlaceholder: "Sélectionnez un genre",
    searchLabel: "Rechercher des catégories Netflix",
    skipToContent: "Aller aux catégories",
    categoriesHeading: "Toutes les catégories Netflix",
    categoriesIntro: (n) =>
      `${n} catégories. D'autres se chargent au défilement.`,
    goToCategory: "Aller à la catégorie",
    opensNewTab: "s'ouvre dans un nouvel onglet",
    languageNav: "Langue",
    results: (n) => `${n} catégories trouvées`,
    noResults: "Aucune catégorie trouvée.",
    loading: "Chargement des catégories…",
    popularHeading: "Catégories populaires",
    searchResultsHeading: "Résultats de recherche",
  },
  de: {
    title: "Entdecken Sie die versteckten Kategorien von Netflix",
    subtitle: "Finden Sie Ihre perfekte Show in Sekunden, nicht Stunden",
    searchPlaceholder: "Wählen Sie das Filmgenre",
    searchLabel: "Netflix-Kategorien durchsuchen",
    skipToContent: "Zu den Kategorien springen",
    categoriesHeading: "Alle Netflix-Kategorien",
    categoriesIntro: (n) =>
      `${n} Kategorien. Beim Scrollen werden weitere geladen.`,
    goToCategory: "Zur Kategorie",
    opensNewTab: "wird in einem neuen Tab geöffnet",
    languageNav: "Sprache",
    results: (n) => `${n} Kategorien gefunden`,
    noResults: "Keine Kategorien gefunden.",
    loading: "Kategorien werden geladen…",
    popularHeading: "Beliebte Kategorien",
    searchResultsHeading: "Suchergebnisse",
  },
  ar: {
    title: "اكتشف الفئات الخفية في نتفليكس",
    subtitle: "ابحث عن البرنامج المثالي في ثوانٍ وليس ساعات",
    searchPlaceholder: "اختر نوع الفيلم",
    searchLabel: "ابحث في فئات نتفليكس",
    skipToContent: "تخطٍ إلى الفئات",
    categoriesHeading: "جميع فئات نتفليكس",
    categoriesIntro: (n) => `${n} فئة. يتم تحميل المزيد عند التمرير.`,
    goToCategory: "انتقل إلى الفئة",
    opensNewTab: "يفتح في علامة تبويب جديدة",
    languageNav: "اللغة",
    results: (n) => `تم العثور على ${n} فئة`,
    noResults: "لم يتم العثور على فئات.",
    loading: "جارٍ تحميل الفئات…",
    popularHeading: "الفئات الشائعة",
    searchResultsHeading: "نتائج البحث",
  },
};

export const t = (lang: string): Translation =>
  translations[lang] ?? translations.en;

/** Right-to-left locales, used to set `dir` on <html>. */
export const RTL_LANGS = new Set(["ar"]);
