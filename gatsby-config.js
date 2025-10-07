module.exports = {
  siteMetadata: {
    siteUrl: "https://codesaregreat.com",
    title: "Codes_Are_Great",
    titleTemplate: "Netflix's Secret Categories | %s",
    description:
      "Discover Netflix secret categories! Many hidden genres making it easier to discover films and series. Access the categories instantly on this site.",
    langs: {
      en: "en",
      es: "es",
      fr: "fr",
      de: "de",
      ar: "ar",
    },
  },
  plugins: [
    `gatsby-transformer-json`,
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "data",
        path: "./src/data/",
      },
      __key: "data",
    },
  ],
};
