import React, { useState, useEffect } from 'react';
import Name from './Name';
import Form from './Form';
import {config} from '../const'

const NameList = ({ listId, setError }) => {
  // const URL = 'http://localhost:3000/'
  // const URL = 'https://rixong-baby-spa.herokuapp.com/'
  const URL = config.url.API_URL
  
  
  const [names, setNames] = useState([])
  const [sortedNames, setSortedNames] = useState([])
  const sorts = {
    alpha: (a,b) => a.name.localeCompare(b.name),
    revAlpha: (a,b) => b.name.localeCompare(a.name),
    createdAt: (a,b) => a.created_at.localeCompare(b.created_at),
    revCreatedAt: (a,b) => b.created_at.localeCompare(a.created_at)
  }

  useEffect(() => {
    getNames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listId])

  const getNames = async () => {
    
    const response = await fetch(`${URL}/names/?list_id=${listId}`)
    const result = await response.json();
    // console.log('Names',result.names)
    setNames(result.names)
    setSortedNames(result.names);
  }

  const sortNames = (sortType) => {
    // console.log('Sort', sortType)
    const sorted = names.slice().sort(sorts[sortType])
    setSortedNames(sorted)
  }

  const handleStatusClick = async (nameId) => {
    const result = await fetch(`${URL}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:
        JSON.stringify({
          id: listId,
          name_id: nameId
        })
    })
    let response = await result.json();
    if (!response.error) {
      let tempNames = [...names]
      let curName = tempNames.find(name => name.id === nameId);
      curName.active = !curName.active
      setNames(tempNames);
    }
  }

  const renderNames = () => {
    return sortedNames.map(name => {
      return (<Name
        handleStatusClick={handleStatusClick}
        key={`${name.list_id}-${name.id}`}
        name={name} />)
    })
  }

  return (
    <div>
      <Form
        listId={listId}
        getNames={getNames}
        setError={setError}
        sortNames={sortNames}
      />
      <div className='name-list'>
        {renderNames()}
      </div>
    </div>
  )
}
export default NameList;