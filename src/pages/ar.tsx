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
        title='أكواد Netflix المخفية: تصفح مئات الفئات'
        description='هل تعرف الرموز السرية لـ Netflix؟ العديد من الفئات المخفية تجعل من السهل اكتشاف الأفلام والمسلسلات. الوصول إلى الرموز مباشرة على هذا الموقع.'
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
