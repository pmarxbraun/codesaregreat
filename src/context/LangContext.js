import React, { createContext, useState } from 'react'

export const LangContext = createContext(null)

export default function LangProvider({ children }) {
  const [lang, setLang] = useState('en')

  return (
    <LangContext.Provider
      value={{
        lang,
        setLang,
      }}
    >
      {children}
    </LangContext.Provider>
  )
}
