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
        title='Categorías ocultas de Netflix'
        description='¡Descubre las categorías secretas de Netflix! Muchos géneros ocultos que facilitan el descubrimiento de películas y series. Acceda a las categorías instantáneamente en este sitio.'
        lang='es'
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
