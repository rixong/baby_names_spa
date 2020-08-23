import React, { useState, useEffect } from 'react';
import './custom.css'

const App = () => {
  const URL = 'http://localhost:3000/'
  const [names, setNames] = useState([])
  const [curId, setCurId] = useState('')
  const [queryTerm, setQueryTerm] = useState('')
  const [error, setError] = useState('')


  useEffect(() => {
    getResult();
  }, [])

  const getResult = async () => {
    setError('');
    const uid = window.location.search.replace('?list_id=', '')
    const result = await fetch(`${URL}?list_id=${uid}`)
    let response = await result.json()
    console.log(response)
    if (response.error) {
      setError(response.error)
    }
    else {
      setNames(response.names)
      setCurId(response.uid)
      window.history.pushState("object or string", "Title", `/?list_id=${response.uid}`);
    }
  }

  const addName = async (name) => {
    const result = await fetch(`${URL}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:
        JSON.stringify({
          uid: curId,
          name: name
        })
    })
    const response = await result.json()
    console.log(response)
    if (response.error) {
      setError(response.error)
    }
    else {
      getResult();
    }
  }

  const onSubmitName = (e) => {
    e.preventDefault();
    let name = queryTerm.trim();
    if(name.match(/[^A-z, a-z]/)){
      setError('Name should only include letters.')
      return
    }
    name = queryTerm.split(' ');
    if(name.length > 2){
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
      return (<li className="list-group-item" key={name.id}>{name.name}</li>)
    })
  }

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        {error ?
          <div className="alert alert-danger" role="alert"> {error}</div>
          : null}
        <h5>Your List ID is: <strong>{curId}</strong></h5>
        <hr />
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
        <h2>Name List</h2>
        <ul className="list-group">
          {names ? renderNames() : null}
        </ul>
      </div>
    </div>
  )
}
export default App;