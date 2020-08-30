import React from 'react';

const Alert = ({ error }) => {

  return (
    <div className=''>
      {error ?
        <div className="alert alert-secondary text-dark d-inline" role="alert"> {error}</div>
        : null}
    </div>
  )

}
export default Alert;