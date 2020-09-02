import React from 'react';

const SpinnerBox = () => {
  return (
    <button className="btn btn-primary" type="button" disabled>
    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    Loading...
  </button>
  )
}
export default SpinnerBox;
