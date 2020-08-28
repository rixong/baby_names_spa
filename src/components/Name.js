import React from 'react';

const Name = ({ name, handleStatusClick }) => {

  const status = name.active ? "list-group-item" : "list-group-item strike"

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