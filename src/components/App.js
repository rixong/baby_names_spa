import React, { useState, useEffect } from 'react';
import '../custom.css'
import Alert from './Alert'
import NameList from './NameList'

const App = () => {
  const URL = 'http://localhost:3000/'
  // const URL = 'https://rixong-baby-spa.herokuapp.com/'
  const [curList, setCurList] = useState('')
  const [error, setError] = useState('')


  useEffect(() => {
    getList();
  }, [])

  ///
  const getList = async () => {
    setError('');
    const uid = window.location.search.replace('?list_id=', '')  /// THESE CAN BE COMBINED
    const response = await fetch(`${URL}?list_id=${uid}`)
    let result = await response.json()
    console.log('result', result.list)
    if (result.error) {
      setError(result.error)
    }
    else {
      setCurList(result.list)
      window.history.pushState("object or string", "Title", `/?list_id=${result.list.uid}`);
    }
  }

  return (
    <div className='container'>
      <h1>Baby Names</h1>
      <div className='row'><Alert error={error}/></div>
      <h5>Your unique URL is: 
        { curList.uid ?
        <span style={{ color: 'red' }}>{URL}{curList.uid}</span>
        : null}
        </h5>
      <hr />
      <h2>Name List</h2>
      {curList ? <NameList listId={curList.id} setError={setError}/> : null}
    </div>
  )
}
export default App;