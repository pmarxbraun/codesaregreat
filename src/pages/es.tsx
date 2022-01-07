import React from 'react'
import { graphql } from 'gatsby'

import IndexTemplate from '../templates/index'
import SEO from '../components/seo'

const IndexPage = ({ data }) => {
  const { es } = data.site.siteMetadata.langs
  return (
    <>
      <SEO
        id='home'
        title='Códigos ocultos de Netflix'
        description='¿Conoces los códigos secretos de Netflix? Muchas categorías ocultas que facilitan el descubrimiento de películas y series. Acceda a los códigos directamente en este sitio.'
      />
      <IndexTemplate lang={es} />
    </>
  )
}

export default IndexPage

export const query = graphql`
  {
    site {
      siteMetadata {
        langs {
          es
        }
      }
    }
  }
`
