import * as React from 'react'
import { Link } from 'gatsby'

import { routes } from '../data/routes'

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
    {routes.home.map(string => (
      <Link
        key={string.slug}
        style={{ color: 'var(--main-color)' }}
        activeStyle={{ color: '#fff' }}
        className='margin-r-xs'
        to={`${string.slug}`}
      >
        {string.label}
      </Link>
    ))}
    <p className='margin-r-xs'>‧</p>
    <a
      style={{ color: `var(--main-color)` }}
      href='https://github.com/pmarxbraun/codesaregreat'
      target='_blank'
      rel='noreferrer'
    >
      Github
    </a>
  </nav>
)

export default Footer
