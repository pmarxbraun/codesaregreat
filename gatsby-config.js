module.exports = {
  siteMetadata: {
    siteUrl: 'https://codesaregreat.com',
    title: 'Netflix hidden codes: browse through hundreds of categories',
    titleTemplate: '%s · Netflix codes generator | CAG',
    description:
      'Browse through hundreds of hidden Netflix categories to find the perfect movie or serie for tonigth.',
    langs: {
      en: 'en',
      es: 'es',
      fr: 'fr',
      de: 'de',
      ar: 'ar',
    },
  },
  plugins: [
    `gatsby-transformer-json`,
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: './src/data/',
      },
      __key: 'data',
    },
  ],
}
