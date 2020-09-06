import React from 'react';
import {connect} from 'react-redux';

import {deleteName} from '../actions';

const Name = ({ name, handleStatusClick, deleteName, curList }) => {

  const divClassDefault = 'list-group-item py-0 pr-1 mb-4 rounded'
  const divClassFinal = name.active ?
    `${divClassDefault} bg-primary text-dark`
    : `${divClassDefault} bg-info strike`


  return (
    <div
      data-id={name.id}
      className={divClassFinal}
      // onClick={() => handleStatusClick(name.id)}
    >
      {name.name}
      <button 
        type="button"
        onClick={(e) => deleteName(curList.id, name.id)}
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
export default connect (mapStateToProps, {deleteName})(Name);