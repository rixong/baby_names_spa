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

  const getNames = async () => {
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
      getNames();
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
    // console.log('Name', name)
    addName(name);
    setQueryTerm('');
  }

  const renderNames = () => {
    return names.map(name => {
      return (<Name
        handleStatusClick={handleStatusClick}
        key={`${name.list_id}-${name.id}`}
        name={name} />)
    })
  }

  return (
    <div>
      <form onSubmit={onSubmitName}>
        <div className="form-group">
          <div className='input-group w-5'>
            <div className='input-group-prepend'>
              <span className="input-group-text">Name</span>
            </div>
            <input
              type='text'
              className='form-control'
              value={queryTerm}
              onChange={(e) => setQueryTerm(e.target.value)}
            ></input>
            <div class="input-group-append">
              <button
                className='btn btn-secondary'
                type='button'
              >Submit</button>
              <button
                type="button"
                class="btn btn-secondary dropdown-toggle dropdown-toggle-split"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              ><span class="sr-only">Sort order</span></button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">A-Z</a>
                <a class="dropdown-item" href="#">Z-A</a>
                <div role="separator" class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Newest</a>
                <a class="dropdown-item" href="#">Oldest</a>
                <div role="separator" class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Shortest</a>
                <a class="dropdown-item" href="#">Longest</a>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div>
        {renderNames()}
      </div>
    </div>
  )
}
export default NameList;