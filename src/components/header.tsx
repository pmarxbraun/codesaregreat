import * as React from 'react'
import { Link } from 'gatsby'

const Header = () => (
  <nav
    className='flex-row padding-sm'
    style={{ alignItems: 'baseline', flex: 0 }}
  >
    <Link to='/'>
      <h1 className='text-xl margin-r-xs glow' >
        Codes Are Great
      </h1>
    </Link>
    <p className='text-xs'>A Netflix codes generator</p>
  </nav>
)

export default Header
