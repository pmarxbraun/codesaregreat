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
        title='Codes cachés Netflix'
        description='Connaissez-vous les codes secrets de Netflix ? De nombreuses catégories cachées permettant de découvrir plus facilement des films et des séries. Accédez aux codes directement sur ce site.'
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
