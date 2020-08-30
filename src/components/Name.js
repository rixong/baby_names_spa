import React from 'react';

const Name = ({ name, handleStatusClick }) => {

  const divClassDefault = 'list-group-item rounded-circle'
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
    </div>
  )
}
export default Name;