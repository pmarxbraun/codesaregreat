import React from 'react'
import { graphql } from 'gatsby'

import IndexTemplate from '../templates/index'
import SEO from '../components/seo'

const IndexPage = ({ data }) => {
  const { ar } = data.site.siteMetadata.langs
  return (
    <>
      <SEO
        id='home'
        title='فئات Netflix المخفية: تصفح مئات التصنيفات'
        description='اكتشف فئات Netflix السرية! العديد من التصنيفات المخفية تجعل من السهل اكتشاف الأفلام والمسلسلات. الوصول إلى الفئات مباشرة على هذا الموقع.'
        lang='ar'
      />
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
