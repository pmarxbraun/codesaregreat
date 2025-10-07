import React from 'react'
import { graphql } from 'gatsby'

import IndexTemplate from '../templates/index'
import SEO from '../components/seo'

const IndexPage = ({ data }) => {
  const { en } = data.site.siteMetadata.langs
  return (
    <>
      <SEO
        id='home'
        title='Netflix Secret Categories: Browse Hundreds of Hidden Genres'
        description='Discover Netflix secret categories! Many hidden genres making it easier to discover films and series. Access the categories instantly on this site.'
      />
      <IndexTemplate lang={en} />
    </>
  )
}

export default IndexPage

export const query = graphql`
  {
    site {
      siteMetadata {
        langs {
          en
        }
      }
    }
  }
`
