import React from 'react'
import { Link } from 'gatsby'

const strings = {
  en: {
    title: 'Codes Are Great',
    subtitle: 'A Netflix codes generator',
  },
  es: {
    title: 'Codes Are Great',
    subtitle: 'A Netflix codes generatores',
  },
  de: {
    title: 'Codes Are Great',
    subtitle: 'Ein Netflix-Code-Generator',
  },
  fr: {
    title: 'Codes Are Great',
    subtitle: 'Generateur de codes cachés Netflix',
  },
  ar: {
    title: 'Codes Are Great',
    subtitle: 'مولد أكواد Netflix',
  },
}

const Header = ({ lang }) => (
  <nav
    className='flex-row padding-sm'
    style={{ alignItems: 'baseline', flex: 0 }}
  >
    <Link to='/'>
      <h1 className='text-xl margin-r-xs glow'>{strings[lang].title}</h1>
    </Link>
    <p className='text-xs'>{strings[lang].subtitle}</p>
  </nav>
)

export default Header
