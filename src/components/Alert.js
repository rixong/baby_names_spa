import React from 'react';

const Alert = ({ error }) => {

  return (
    <div className='m-3'>
      {error ?
        <div className="alert alert-warning text-dark d-inline" role="alert"> {error}</div>
        : null}
    </div>
  )

}
export default Alert;