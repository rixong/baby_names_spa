import React, { useState, useEffect } from 'react';

const App = () => {
  const URL = 'http://localhost:3000/'
  const [names, setNames] = useState([])
  const [curId, setCurId] = useState('')
  const [queryTerm, setQueryTerm] = useState('')


  useEffect(() => {
    getResult();
  }, [])
  
  const getResult = async () => {
    const uid = window.location.search.replace('?list_id=', '')
    const result = await fetch(`${URL}?list_id=${uid}`)
    let response = await result.json()
    console.log(response)
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
          name: name
        })
    })
    const response = await result.json()
    console.log(response)
    getResult();
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(queryTerm)
    addName(queryTerm);
    setQueryTerm('');
  }


  const renderNames = () => {
    return names.map(name => {
      return (<li key={name.id}>{name.name}</li>)
    })
  }

  return (
    <div className='container-fluid'>
      <div className='row justify-content-center'>
        <h5>Your List ID is: <strong>{curId}</strong></h5>
        <form onSubmit={onSubmit}>
          <input
            type='text'
            name='name'
            placeholder='Add a name'
            value={queryTerm}
            onChange={(e) => setQueryTerm(e.target.value)}
          ></input>
          <button className='primary'>Submit</button>
        </form>
        <h1>Baby Names</h1>
        <ul>
          {names ? renderNames() : null}
        </ul>
      </div>
    </div>
  )
}
export default App;