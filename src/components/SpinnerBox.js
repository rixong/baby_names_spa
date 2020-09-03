import React from 'react';

const SpinnerBox = () => {
  return (
    <button className="btn btn-secondary text-dark" type="button" disabled>
    <span className="spinner-border spinner-border-sm " role="status" aria-hidden="true"></span>
    &nbsp;&nbsp; Loading...Be patient. You've waited 9 months.
  </button>
  )
}
export default SpinnerBox;
