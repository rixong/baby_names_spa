import React from 'react';

const SpinnerBox = () => {
  return (
    // <div className="spinner-grow text-primary" role="status">
    //   <span className="sr-only">Loading...</span>
    // </div>
    <button className="btn btn-primary" type="button" disabled>
    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    Loading...
  </button>
  )
}
export default SpinnerBox;
