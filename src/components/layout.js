import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'

const Layout = ({ children, lang }) => {
  return (
    <div className='flex-column' style={{ height: '100%' }}>
      <Header lang={lang} />
      <main
        className='padding-t-xl'
        style={{
          flex: 1,
          display: 'flex-column',
          width: '90%',
          maxWidth: '620px',
          margin: 'auto',
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
