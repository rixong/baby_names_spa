import React from 'react';

const Alert = ({error}) => {

  console.log(error)
  return (
    <div>        
      {error ?
      <div className="alert alert-danger" role="alert"> {error}</div>
      : null}
    </div>
  )
}
export default Alert;