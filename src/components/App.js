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
      // console.log(result.list.uid)
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
    <div className='container p-5 rounded'>
      <h1 className='display-1 text-primary'>Baby Names</h1>
      <div className='row d-inline'>
        <h5 className='text-primary'>Your unique URL:</h5>
        {curList.uid ?
          <h4 className='mt-3 text-info' id='uniqueUrl'>{clientURL}{`/?list_id=${curList.uid}`}
            <button className='btn btn-secondary text-dark ml-4' onClick={copyUrl}>Copy</button>
          </h4>
          : null}
      </div>
      <h1 className='text-primary'>&mdash;&mdash;&mdash;&mdash;</h1>
      <Alert error={error} />
      {curList ?
        <NameList listId={curList.id} setError={setError} />
        : null}
    </div>
  )

}
export default App;