import React from 'react';

const Name = ({ name, handleStatusClick, handleDeleteClick }) => {

  const divClassDefault = 'list-group-item py-0 pr-1 mb-4 rounded'
  const divClassFinal = name.active ?
    `${divClassDefault} bg-primary text-dark`
    : `${divClassDefault} bg-info strike`


  return (
    <div
      data-id={name.id}
      className={divClassFinal}
      onClick={() => handleStatusClick(name.id)}
    >
      {name.name}
      <button 
        type="button"
        onClick={(e) => handleDeleteClick(e, name.id)}
        className="close ml-3" 
        aria-label="Close">
        <span aria-hidden="true" className='h4' >&times;</span>
      </button>
    </div>
  )
}
export default Name;