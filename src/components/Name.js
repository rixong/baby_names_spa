import React from 'react';

const Name = ({ name, handleStatusClick }) => {

  const status = name.active ? "list-group-item rounded-circle" : "list-group-item rounded-circle strike"

  return (
    <div
      data-id={name.id}
      className={status}
      onClick={() => handleStatusClick(name.id)}
    >
      {name.name}
    </div>
  )
}
export default Name;