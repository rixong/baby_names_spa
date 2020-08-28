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
    if (result.error) {
      setError(result.error)
    }
    else {
      console.log(result.curList)
      setCurList(result.curList)
      window.history.pushState("object or string", "Title", `/?list_id=${result.curList.uid}`);
    }
  }

  return (
    <div className='container'>
      <h1>Baby Names</h1>
      <div className='row'><Alert error={error}/></div>
      <h5>Your unique URL is: <span style={{ color: 'red' }}>{URL}{curList.uid}</span></h5>
      <hr />
      <h2>Name List</h2>
      {curList ? <NameList listId={curList.id} /> : null}
    </div>
  )
}
export default App;