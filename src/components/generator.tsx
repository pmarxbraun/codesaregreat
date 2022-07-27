import { graphql, useStaticQuery } from 'gatsby'
import React, { useState } from 'react'

import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import Open from './svg/open'

const animatedComponents = makeAnimated()

const strings = {
  en: {
    placeholder: 'Search movie genre or tap to use dropdown',
    noOptionsMessage: 'No category found for this search',
    emptySearch:
      "Please choose a movie genre above like 'Action', 'Comedy', or 'Sci-Fi'",
  },
  es: {
    placeholder:
      'Busque el género de la película o toque para usar el menú desplegable',
    noOptionsMessage: 'No se encontró ninguna categoría para esta búsqueda',
    emptySearch:
      "Elija uno de los géneros de películas anteriores, como 'Acción', 'Comedia' o 'Ciencia ficción'.",
  },
  de: {
    placeholder:
      'Durchsuchen Sie das Filmgenre oder tippen Sie, um das Dropdown-Menü zu verwenden',
    noOptionsMessage: 'Keine Kategorie für diese Suche gefunden',
    emptySearch:
      "Bitte wählen Sie oben ein Filmgenre wie 'Action', 'Comedy' oder 'Sci-Fi' aus.",
  },
  fr: {
    placeholder: 'Recherchez un genre ou cliquez pour voir les catégories',
    noOptionsMessage:
      "Ooops nous n'avons pas trouvé de catégorie pour cette recherche",
    emptySearch:
      "Recherchez une catégorie telle que 'Comédie', 'Action' ou 'Science Fiction'",
  },
  ar: {
    placeholder: 'ابحث عن نوع الفيلم أو انقر لاستخدام القائمة المنسدلة',
    noOptionsMessage: 'لم يتم العثور على فئة لهذا البحث',
    emptySearch:
      "الرجاء اختيار نوع فيلم أعلاه ، مثل 'حركة' أو 'كوميديا' أو'خيال علمي",
  },
}

const Generator = ({ lang }) => {
  const data = useStaticQuery(graphql`
    {
      allDataJson {
        nodes {
          search_engines {
            api
            name
            pinned
          }
        }
      }
    }
  `)
  const { search_engines } = data.allDataJson.nodes[0]

  interface Code {
    api: string
    name: string
    pinned: boolean
  }

  interface Options {
    value: string
    label: string
    isDefault: boolean
  }

  const options = search_engines.map(
    (code: Code): Options => ({
      value: code.api,
      label: code.name,
      isDefault: code.pinned,
    })
  )

  const customStyles = {
    container: provided => ({
      ...provided,
      width: '100%',
      minWidth: 380,
    }),
    option: provided => ({
      ...provided,
      borderBottom: '1px dotted white',
      color: 'var(--main-color)',
      padding: '10px 20px',
      fontSize: 'var(--text-sm)',
      ':hover': {
        backgroundColor: '#fff',
        cursor: 'pointer',
      },
    }),
    menuList: provided => ({
      ...provided,
      backgroundColor: 'black',
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      display: 'flex',
      width: '100%',
    }),
    multiValue: provided => ({
      ...provided,
      backgroundColor: 'var(--main-color)',
    }),
    dropdownIndicator: provided => ({
      ...provided,
      color: 'var(--main-color)',
    }),
    multiValueLabel: provided => ({
      ...provided,
      fontSize: 'var(--text-sm)',
      color: '#fff',
      padding: 'var(--space-xs)',
    }),
    multiValueRemove: provided => ({
      ...provided,
      color: '#fff',
    }),
    placeholder: provided => ({
      ...provided,
      color: '#fff',
    }),
    valueContainer: provided => ({
      ...provided,
      padding: '2px 0px',
    }),
    input: provided => ({
      ...provided,
      color: '#fff',
    }),
  }

  const defaults = options.filter((code: Options) => code.isDefault === true)
  const [selectedOption, setSelectedOption] = useState(defaults)

  return (
    <>
      <div style={{ flex: '1' }}>
        <Select
          styles={customStyles}
          className='margin-b-xs'
          onChange={setSelectedOption}
          closeMenuOnSelect={true}
          components={animatedComponents}
          defaultValue={selectedOption}
          isMulti
          options={options}
          placeholder={strings[lang].placeholder}
          noOptionsMessage={() => strings[lang].noOptionsMessage}
        />
      </div>
      <div className='grid' style={{ flex: '2' }}>
        {selectedOption.length > 0 ? (
          selectedOption.map(code => (
            <a
              key={code.value}
              href={code.value}
              target='_blank'
              rel='noreferrer'
              className='genre_links'
            >
              {code.label} <Open />
            </a>
          ))
        ) : (
          <p className='text-xs' style={{ alignSelf: 'flex-start' }}>
            {strings[lang].emptySearch}
          </p>
        )}
      </div>
    </>
  )
}

export default Generator
