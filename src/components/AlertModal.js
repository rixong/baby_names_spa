import React from 'react';

const AlertModal = () => {


  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-body bg-danger">
          This name is already in list.
      </div>
      </div>
    </div>
  </div>
  )
}

export default AlertModal;