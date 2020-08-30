import React, { useState } from 'react';

const Form = ({ listId, getNames, sortNames, setError }) => {
  
  const URL = 'http://localhost:3000/'
  const [queryTerm, setQueryTerm] = useState('')
  
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

  const onSelectSort = (e) => {
    sortNames(e.target.value)
  }



  return (
    <div className='mb-5'>
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
            <div className="input-group-append">
              <button
                className='btn btn-secondary'
                type='button'
                onClick={onSubmitName}
              >Submit</button>
              <button
                type="button"
                className="btn btn-secondary dropdown-toggle dropdown-toggle-split"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              // onClick={onSelectSort}
              ><span className="sr-only">Sort order</span></button>
              <div className="dropdown-menu">
                <button className="dropdown-item" type="button" value='alpha' onClick={onSelectSort}>A-Z</button>
                <button className="dropdown-item" type="button" value='revAlpha' onClick={onSelectSort}>Z-A</button>
                <div role="separator" className="dropdown-divider"></div>
                <button className="dropdown-item" type="button" value='createdAt' onClick={onSelectSort}>Newest</button>
                <button className="dropdown-item" type="button" value='revCreatedAt' onClick={onSelectSort}>Oldest</button>
                <div role="separator" className="dropdown-divider"></div>
                <button className="dropdown-item" type="button" value='active' onClick={onSelectSort}>Active</button>
                <button className="dropdown-item" type="button" value='inactive' onClick={onSelectSort}>Inactive</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
export default Form;