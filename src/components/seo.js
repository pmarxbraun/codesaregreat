import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router";
import { useStaticQuery, graphql } from "gatsby";

import { routes } from "../data/routes";
import { RTL_LANGS } from "../data/translations";

const SEO = ({ id, title, description, image, article, lang = "en" }) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          defaultTitle: title
          titleTemplate
          defaultDescription: description
          siteUrl
        }
      }
    }
  `);

  const { pathname } = useLocation();
  const { site } = data;

  const { defaultTitle, titleTemplate, defaultDescription, siteUrl } =
    site.siteMetadata;

  const alternates = routes[id].map((alternate) => (
    <link
      key={alternate.code}
      rel="alternate"
      hrefLang={alternate.code}
      href={`${siteUrl}${alternate.slug}`}
    />
  ));

  alternates.push(<link key="x-default" rel="alternate" hrefLang="x-default" href={siteUrl} />);

  const defaultImage = "/icon.png";
  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
  };

  return (
    <Helmet
      title={seo.title}
      titleTemplate={titleTemplate}
      htmlAttributes={{ lang, dir: RTL_LANGS.has(lang) ? "rtl" : "ltr" }}
    >
      {alternates && alternates}
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      {seo.url && <meta property="og:url" content={seo.url} />}
      {(article ? true : null) && <meta property="og:type" content="article" />}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      {seo.image && <meta property="og:image" content={seo.image} />}
      <meta name="twitter:card" content="summary_large_image" />
      {/* {twitterUsername && (
        <meta name='twitter:creator' content={twitterUsername} />
      )} */}
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}
      {seo.image && <meta name="twitter:image" content={seo.image} />}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,400;0,500;1,400&display=swap"
        rel="stylesheet"
      />
    </Helmet>
  );
};

export default SEO;

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool,
};

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  article: false,
};
