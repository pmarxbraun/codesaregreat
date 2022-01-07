import React from 'react'
import { graphql } from 'gatsby'

import IndexTemplate from '../templates/index'
import SEO from '../components/seo'

const IndexPage = ({ data }) => {
  const { de } = data.site.siteMetadata.langs
  return (
    <>
      <SEO
        id='home'
        title='Durchsuchen Sie Hunderte von Kategorien'
        description='Kennen Sie die Geheimcodes von Netflix? Viele versteckte Kategorien erleichtern das Auffinden von Filmen und Serien. Greifen Sie direkt auf dieser Site auf die Codes zu.'
      />
      <IndexTemplate lang={de} />
    </>
  )
}

export default IndexPage

export const query = graphql`
  {
    site {
      siteMetadata {
        langs {
          de
        }
      }
    }
  }
`
