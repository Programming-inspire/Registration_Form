import React from 'react';
import './DeleteModal.css';

const DeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Are you sure you want to delete this record?</h2>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="Yes">Yes</button>
          <button onClick={onCancel} className='No'>No</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
