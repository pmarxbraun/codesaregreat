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
        title='Codes cachés Netflix : parcourez des centaines de catégories'
        description='Parcourez des centaines de catégories Netflix cachées pour trouver le film ou la série parfait pour ce soir.'
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
