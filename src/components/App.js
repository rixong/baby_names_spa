import React, { useState, useEffect } from 'react';
import '../custom.css'
import Alert from './Alert'
import NameList from './NameList'
import {config} from '../const'
// import ALertModal from './AlertModal'

const App = () => {
  // const URL = 'http://localhost:3000/'
  // const URL = 'https://rixong-baby-spa.herokuapp.com/'
  const URL = config.url.API_URL

  const clientURL = 'https://pensive-villani-db112d.netlify.app/'
  const [curList, setCurList] = useState([])
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

      {/* <button type="button" data-toggle="modal" data-target="#exampleModal">Launch modal</button> */}

      <div className='display-1 text-light '>Baby Names</div>
      <div className='row d-inline'>
        <h4 className='text-light font-weight-light'>Your unique URL:</h4>
        {curList ?
          <h4 className='mt-3 text-info' id='uniqueUrl'>{clientURL}{`?list_id=${curList.uid}`}
            <button 
              className='btn btn-secondary text-dark ml-4'
              id='copy-button'
              onClick={copyUrl}
            >Copy
            </button>
          </h4>
          : null}
      </div>
      <div className='alert-box'>
        <Alert error={error} />
      </div>
      <h1 className='text-primary'>&mdash;&mdash;&mdash;&mdash;</h1>
      {curList.id ?
        <NameList listId={curList.id} setError={setError} />
        : null}
    </div>
  )

}
export default App;