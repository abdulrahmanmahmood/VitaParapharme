import React from 'react';
import './deleteDialog.css';

const DeleteDialog = ({ isOpen, onCancel, onConfirm }) => {
  return (
    <>
      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <div>Are you sure you want to delete this admin?</div>
            <div className="button-container">
              <button className="confirm-button yes" onClick={onConfirm}>
                Yes
              </button>
              <button className="confirm-button no" onClick={onCancel}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteDialog;