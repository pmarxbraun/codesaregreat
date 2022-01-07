import React from 'react'
import { graphql } from 'gatsby'

import IndexTemplate from '../templates/index'
import SEO from '../components/seo'

const IndexPage = ({ data }) => {
  const { de } = data.site.siteMetadata.langs
  return (
    <>
      <SEO id='home' />
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
