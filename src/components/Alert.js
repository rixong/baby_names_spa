import React from 'react';

const Alert = ({ error }) => {

  console.log(error)
  return (
    <div className='m-3'>
      {error ?
        <div className="alert alert-danger d-inline" role="alert"> {error}</div>
        : null}
    </div>
  )

}
export default Alert;