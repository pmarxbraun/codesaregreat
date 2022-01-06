import * as React from 'react'

const Footer = () => (
  <nav
    className='flex-row padding-sm'
    style={{
      alignItems: 'baseline',
      justifyContent: 'flex-end',
      color: `var(--main-color)`,
      flex: 0,
    }}
  >
    <p className='margin-r-xs'>Codes Are Great</p>
    <a style={{ color: `var(--main-color)` }} href='lequipe.fr' target='_blank' rel='noreferrer'>
      Github
    </a>
  </nav>
)

export default Footer
