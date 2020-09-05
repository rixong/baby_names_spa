import React from 'react';
import {connect} from 'react-redux';

const Alert = ({ error, message }) => {

  return (
    <div className="row">
      <div className="col-4 offset-4 align-items-center">
      {error ?
        <div className="alert alert-secondary text-dark" role="alert"> {message}</div>
        : null}
      </div>
    </div>
  )
}

    const mapStateToProps = state => {
      return {
        error: state.error,
        message: state.message
      }
    };

export default connect(mapStateToProps)(Alert);