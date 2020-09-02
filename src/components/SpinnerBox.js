import React from 'react';

const SpinnerBox = () => {
  return (
    <button className="btn btn-secondary" type="button" disabled>
    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    &nbsp;&nbsp; Loading...
  </button>
  )
}
export default SpinnerBox;
