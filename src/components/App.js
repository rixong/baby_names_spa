import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { CopyIcon, CheckCircleIcon } from '@primer/octicons-react';

import '../custom.css';
import Alert from './Alert';
import NameList from './NameList';
import Footer from './Footer'

import { config } from '../const';

import { getCurList } from '../actions'

const App = ({ getCurList, curList }) => {

  const URL = config.url.API_URL
  const clientURL = config.url.CLIENT_URL

  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const path = window.location.search
    getCurList(path)

  }, [URL, getCurList])


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
    <div className='container rounded px-4'>
      <div className='text-light app-title'>Baby Names</div>

      <div className='row align-items-end no-gutters'>
        <div className='col-7'>
          <h4 className='text-light font-weight-light text-right'>Your unique URL :</h4>
        </div>
        <div className='col text-left ml-3'>
          <button
            className='btn btn-secondary text-dark'
            id='copy-button'
            onClick={copyUrl}
          >
            {copied ? <CheckCircleIcon size={24} /> : <CopyIcon size={24} />}
          </button>
        </div>
      </div>
        <div className='text-center d-none d-sm-block'>
          {curList ?
            <h5 className='mt-3 text-info' id='uniqueUrl'>{clientURL}{`?list_id=${curList.uid}`}</h5>
            : null}
        </div>

      <Alert />

      <h1 className='text-primary'>&mdash;&mdash;&mdash;&mdash;</h1>
      {curList ? <NameList /> : null}
      <Footer />
    </div>
  )
}

const mapStateToProps = state => {
  return { curList: state.curList }
};

export default connect(mapStateToProps, { getCurList })(App);