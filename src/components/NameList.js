import React, { useState, useEffect } from 'react';
import Name from './Name'

const NameList = ({ listId, setError }) => {
  const URL = 'http://localhost:3000/'

  const [names, setNames] = useState([])
  const [queryTerm, setQueryTerm] = useState('')

  useEffect(() => {
    // console.log(listId)
    getNames();
  }, [listId])

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
      setNames(tempNames)
    }
  }

  const getNames = async() => {
    const response = await fetch(`${URL}/names/?list_id=${listId}`)
    const result = await response.json();
    // console.log('Names',result.names)
    setNames(result.names)
  }

  const addName = async (name) => {
    const response = await fetch(`${URL}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:
        JSON.stringify({
          id: listId,
          name: name
        })
    })
    const result = await response.json()
    // console.log(result)
    if (result.error) {
      setError(result.error)
    }
    else {
      setError('Done!')
    }
  }

  const onSubmitName = (e) => {
    e.preventDefault();
    let name = queryTerm.trim();
    if (name.match(/[^A-z, a-z]/)) {
      setError('Name should only include letters.')
      return
    }
    name = queryTerm.split(' ');
    if (name.length > 2) {
      setError('Name should only include maximum one space.')
      return
    }
    //Fix capitalization
    name = name.map(subname => {
      return (subname.slice(0, 1).toUpperCase() + subname.slice(1).toLowerCase())
    }).join(' ');
    console.log('Name', name)
    addName(name);
    setQueryTerm('');
  }

  const renderNames = () => {
    return names.map(name => {
      return (<Name 
        handleStatusClick={handleStatusClick} 
        key={`${name.list_id}-${name.id}`}
        name={name}/>)
    })
  }

  return (
    <div>
      <form onSubmit={onSubmitName}>
        <div className="form-group">
          <input
            type='text'
            name='name'
            placeholder='Add a name'
            value={queryTerm}
            onChange={(e) => setQueryTerm(e.target.value)}
          ></input>
          <button className='primary'>Submit</button>
        </div>
      </form>
      {renderNames()}
    </div>
  )
}
export default NameList;