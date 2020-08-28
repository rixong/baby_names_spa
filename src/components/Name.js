import React from 'react';


const Name = ({name, handleStatusClick}) => {

  const textType = name.active ? "list-group-item" : "list-group-item strike"

  return (
    <div 
    data-id={name.id}
    className={textType}
    onClick={() => handleStatusClick(name.id)}
    >
      {name.name}
    </div>
  )
}
export default Name;