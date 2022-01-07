import React from 'react'
import { graphql } from 'gatsby'

import IndexTemplate from '../templates/index'
import SEO from '../components/seo'

const IndexPage = ({ data }) => {
  const { ar } = data.site.siteMetadata.langs
  return (
    <>
      <SEO id='home' />
      <IndexTemplate lang={ar} />
    </>
  )
}

export default IndexPage

export const query = graphql`
  {
    site {
      siteMetadata {
        langs {
          ar
        }
      }
    }
  }
`
