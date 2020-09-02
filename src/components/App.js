import React, { useState, useEffect } from 'react';
import '../custom.css';
import Alert from './Alert';
import NameList from './NameList';
import Spinner from './SpinnerBox';

import {config} from '../const';
import {CopyIcon, CheckCircleIcon} from '@primer/octicons-react';

const App = () => {

  const URL = config.url.API_URL 
  const clientURL = config.url.CLIENT_URL

  const [curList, setCurList] = useState(undefined)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {

    const getList = async () => {
      setError('');
      const path = window.location.search
      const response = await fetch(`${URL}${path}`)
      let result = await response.json()
      if (result.error) {
        setError(result.error)
      }
      else {
        setCurList(result.list)
        window.history.pushState("object or string", "Title", `/?list_id=${result.list.uid}`);
      }
    }

    getList();
  }, [URL])


  function copyUrl() {
    var elem = document.getElementById("uniqueUrl");
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(elem);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("Copy");
    selection.removeAllRanges();
    setCopied(true);
  }

  return (
    <div className='container p-5 rounded'>
      <div className='display-1 text-light '>Baby Names</div>
      <div className='row d-inline'>
        <h4 className='text-light font-weight-light'>Your unique URL :</h4>
        {curList ?
          <h5 className='mt-3 text-info' id='uniqueUrl'>{clientURL}{`?list_id=${curList.uid}`}
            <button 
              className='btn btn-secondary text-dark ml-4'
              id='copy-button'
              onClick={copyUrl}
            >
              {copied ? <CheckCircleIcon size={24}/> : <CopyIcon size={24}/>}
            </button>
          </h5>
          : null}
      </div>
      <div className='alert-box'>
        <Alert error={error} />
      </div>
      <h1 className='text-primary'>&mdash;&mdash;&mdash;&mdash;</h1>
      {curList ?
        <NameList listId={curList.id} setError={setError} />
        : <Spinner/>}
    </div>
  )

}
export default App;