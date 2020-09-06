import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  addName,
  setSortOrder,
  setErrorMessage,
  clearErrorMessage
}
  from '../actions';


const Form = ({ curList, addName, setErrorMessage, clearErrorMessage, setSortOrder }) => {

  const [queryTerm, setQueryTerm] = useState('')

  const onSubmitName = (e) => {
    e.preventDefault();

    let name = queryTerm.trim();

    if (name.match(/[^A-z, a-z]/) || !name) {
      setErrorMessage('Name should only include letters.')
      setQueryTerm('');
      return
    }
    name = queryTerm.split(' ');
    if (name.length > 2) {
      setErrorMessage('Name should only include maximum one space.')
      setQueryTerm('');
      return
    }
    //Fix capitalization
    name = name.map(subname => {
      return (subname.slice(0, 1).toUpperCase() + subname.slice(1).toLowerCase())
    }).join(' ');
    // console.log('Name', name)
    addName(curList.id, name);
    setQueryTerm('');
  }

  const onHandleFocus = () => {
    // console.log('focus!')
    clearErrorMessage()
    // document.querySelector('.name-input').value = ''
  }

  return (
    <div className='mb-5'>
      <form onSubmit={onSubmitName}>
        <div className="form-group">
          <div className='input-group w-5'>
            <div className='input-group-prepend'>
              <span className="input-group-text bg-info text-dark name-input">Name</span>
            </div>
            <input
              type='text'
              className='form-control'
              placeholder='Add names to your list here'
              value={queryTerm}
              onChange={(e) => setQueryTerm(e.target.value)}
              onFocus={onHandleFocus}
            ></input>
            <div className="input-group-append">
              <button
                className='btn btn-secondary'
                type='button'
                onClick={onSubmitName}
              >Submit</button>
              <button
                type="button"
                className="btn btn-secondary dropdown-toggle dropdown-toggle-split"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              ><span className="sr-only">Sort order</span></button>
              <div className="dropdown-menu">
                <button className="dropdown-item" type="button" value='alpha' onClick={(e) => setSortOrder(e.target.value)}>A-Z</button>
                <button className="dropdown-item" type="button" value='revAlpha' onClick={(e) => setSortOrder(e.target.value)}>Z-A</button>
                <div role="separator" className="dropdown-divider"></div>
                <button className="dropdown-item" type="button" value='createdAt' onClick={(e) => setSortOrder(e.target.value)}>Newest</button>
                <button className="dropdown-item" type="button" value='revCreatedAt' onClick={(e) => setSortOrder(e.target.value)}>Oldest</button>
                <div role="separator" className="dropdown-divider"></div>
                <button className="dropdown-item" type="button" value='shortest' onClick={(e) => setSortOrder(e.target.value)}>Shortest</button>
                <button className="dropdown-item" type="button" value='longest' onClick={(e) => setSortOrder(e.target.value)}>Longest</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    curList: state.curList
  }
};

export default connect(mapStateToProps, {
  addName,
  setErrorMessage,
  setSortOrder,
  clearErrorMessage
})(Form);