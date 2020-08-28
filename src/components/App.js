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
    const result = await fetch(`${URL}?list_id=${uid}`)
    let response = await result.json()
    // console.log(response)
    if (response.error) {
      setError(response.error)
    }
    else {
      setCurList(response.uid)
      window.history.pushState("object or string", "Title", `/?list_id=${response.uid}`);
    }
  }

  return (
    <div className='container'>
      <h1>Baby Names</h1>
      <div className='row'>
        <Alert error={error}/>
      </div>
  <h5>Your unique URL is: <span style={{color: 'red'}}>{URL}{curList.uid}</span></h5>
        <hr />
 
        <h2>Name List</h2>
        {/* <ul className="list-group">
          {names ? renderNames() : null}
        </ul> */}
        <NameList listId={curList.id}/>
    </div>
  )
}
export default App;