import React, { useState, useEffect } from 'react';
import '../custom.css'
import Alert from './Alert'
import NameList from './NameList'

const App = () => {
  const URL = 'http://localhost:3000/'
  // const URL = 'https://rixong-baby-spa.herokuapp.com/'
  const clientURL = 'http://localhost:3001/'
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
    // console.log('result', result.list)
    if (result.error) {
      setError(result.error)
    }
    else {
      setCurList(result.list)
      window.history.pushState("object or string", "Title", `/?list_id=${result.list.uid}`);
    }
  }

  function copyUrl() {
    var elem = document.getElementById("uniqueUrl");
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(elem);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("Copy");
    document.getElementById('copy-button').textContent = 'Copied!'
  }

  return (
    <div className='container px-5 rounded'>
      <h1 className='display-1 pt-5'>Baby Names</h1>
      <div className='row d-inline'>
        <h5>Your unique URL:</h5>
        {curList.uid ?
          <code className='mx-3' id='uniqueUrl'>{clientURL}{window.location.search}</code>
          : null}
        <button className='button primary' id='copy-button' onClick={copyUrl}>Copy</button>
      </div>
      <Alert error={error} />
      {curList ? <NameList listId={curList.id} setError={setError} /> : null}
    </div>
  )
}
export default App;