import React from 'react'
import { graphql } from 'gatsby'

import IndexTemplate from '../templates/index'
import SEO from '../components/seo'

const IndexPage = ({ data }) => {
  const { fr } = data.site.siteMetadata.langs
  return (
    <>
      <SEO
        id='home'
        title='Catégories cachées Netflix'
        description='Découvrez les catégories secrètes de Netflix ! De nombreux genres cachés permettant de découvrir plus facilement des films et des séries. Accédez aux catégories instantanément sur ce site.'
        lang='fr'
      />
      <IndexTemplate lang={fr} />
    </>
  )
}

export default IndexPage

export const query = graphql`
  {
    site {
      siteMetadata {
        langs {
          fr
        }
      }
    }
  }
`
