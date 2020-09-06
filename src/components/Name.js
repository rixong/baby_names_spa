import React from 'react';
import { connect } from 'react-redux';

import { deleteName, changeNameStatus } from '../actions';

const Name = ({ name, changeNameStatus, deleteName, curList }) => {

  const divClassDefault = 'list-group-item py-0 pr-1 mb-4 rounded'
  const divClassFinal = name.active ?
    `${divClassDefault} bg-primary text-dark`
    : `${divClassDefault} bg-info strike`


  const onHandleClick = (e) => {
    e.stopPropagation()
    deleteName(name.id)
  }


  return (
    <div
      data-id={name.id}
      className={divClassFinal}
      onClick={() => changeNameStatus(name.id)}
    >
      {name.name}
      <button
        type="button"
        onClick={(e) => onHandleClick(e)}
        className="close ml-3"
        aria-label="Close">
        <span aria-hidden="true" className='h4' >&times;</span>
      </button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    curList: state.curList
  }
};
export default connect(mapStateToProps, { deleteName, changeNameStatus })(Name);