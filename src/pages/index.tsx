import React, { useState } from 'react'
import { graphql, SetFieldsOnGraphQLNodeTypeArgs } from 'gatsby'

import Select from 'react-select'
import makeAnimated from 'react-select/animated'

import Header from '../components/header'
import Footer from '../components/footer'
import Open from '../components/svg/open'

const animatedComponents = makeAnimated()

const IndexPage = ({ data }) => {
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
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'red' : 'var(--main-color)',
      padding: '10px 20px',
      fontSize: 'var(--text-sm)',
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      display: 'flex',
      width: '100%',
    }),
    multiValue: (provided, state) => ({
      ...provided,
      backgroundColor: 'var(--main-color)',
    }),
    multiValueLabel: (provided, state) => ({
      ...provided,
      fontSize: 'var(--text-sm)',
      color: '#fff',
      padding: 'var(--space-xs)',
    }),
    multiValueRemove: (provided, state) => ({
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
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1
      const transition = 'opacity 300ms'

      return { ...provided, opacity, transition }
    },
  }

  const defaults = options.filter((code: Options) => code.isDefault === true)
  const [selectedOption, setSelectedOption] = useState(defaults)

  return (
    <div className='flex-column' style={{ height: '100%' }}>
      <Header />
      <main
        style={{
          flex: 1,
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <div
          style={{
            width: '90%',
            maxWidth: '620px',
            display: 'grid',
            justifyItems: 'flex-start',
          }}
        >
          <Select
            styles={customStyles}
            className='margin-b-xs'
            onChange={setSelectedOption}
            closeMenuOnSelect={true}
            components={animatedComponents}
            defaultValue={selectedOption}
            isMulti
            options={options}
            placeholder='Start searching genre or tap to use dropdown'
          />
          <div className='grid'>
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
                Please choose a movie genre above
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default IndexPage

export const query = graphql`
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
`
