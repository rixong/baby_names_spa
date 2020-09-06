import React from 'react';
import { connect } from 'react-redux';
import Spinner from './SpinnerBox';

const Alert = ({ error, message, loading }) => {

  return (
    <div className="row">
      <div className="col-6 offset-3 align-items-center" style={{ height: '20px' }}>
        {error ?
          <div className="alert alert-secondary text-dark" role="alert"> {message}</div>
          : null}
          {loading ? <Spinner /> : null}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    error: state.error,
    message: state.message,
    loading: state.loading
  }
};

export default connect(mapStateToProps)(Alert);