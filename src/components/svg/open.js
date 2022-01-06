import * as React from 'react'

const Open = props => (
  <svg
    width={15}
    height={15}
    viewBox='0 0 10 10'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M8.224 1 4.57 4.653a.55.55 0 0 0 .777.778L9 1.779V3a.5.5 0 0 0 1 0V.5a.498.498 0 0 0-.5-.5H7a.5.5 0 0 0 0 1h1.224ZM10 6V3.623v5.13C10 9.443 9.504 10 8.892 10H1.108C.496 10 0 9.44 0 8.754V1.246C0 .558.496 0 1.108 0h5.338H4a.5.5 0 1 1 0 1H1.285C1.125 1 1 1.15 1 1.334v7.332c0 .181.127.334.285.334h7.43C8.875 9 9 8.85 9 8.666V6a.5.5 0 1 1 1 0Z'
      fill='var(--main-color)'
    />
  </svg>
)

export default Open
