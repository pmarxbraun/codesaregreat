import React from 'react'

import Layout from '../components/layout'
import Generator from '../components/generator'

const IndexTemplate = ({ lang }) => {
  return (
    <Layout lang={lang}>
      <Generator lang={lang} />
    </Layout>
  )
}

export default IndexTemplate
