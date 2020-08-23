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
    // console.log(response)
    if (response.error) {
      setCurId(response.error)
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
          name: name.trim()
        })
    })
    const response = await result.json()
    console.log(response)
    if(response.error){
      setError(response.error)
    }
    else{
      getResult();
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    let name = queryTerm.trim();
    name = name.slice(0,1).toUpperCase() + name.slice(1).toLowerCase()
    console.log('Name', name)
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
        <h5>Your List ID is: <strong>{curId}</strong></h5>
        <hr />
        <form onSubmit={onSubmit}>
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
        <h1>Baby Names</h1>
        <ul className="list-group">
          {names ? renderNames() : null}
        </ul>
        {error ?
        <div className="alert alert-danger" role="alert"> Name already exists! </div>
        : null}
      </div>
    </div>
  )
}
export default App;