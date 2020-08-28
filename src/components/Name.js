import React from 'react';


const Name = ({name}) => {

  const textType = name.active ? "list-group-item" : "list-group-item strike"

  return (
    <div 
    data-id={name.id}
    className={textType}

    >
      {name.name}
    </div>
  )
}
export default Name;