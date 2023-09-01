// import React, { useState } from 'react';
import { Modal, ModalBody, ModalFooter } from '../utils';

// interface ActionProps {
//   handleDeleteClick?: () => void;

// }
function DeleteModal(props: any) {
  const { toggleDeleteModal, handleDeleteClick, modalDelete } = props;

  return (
    <Modal
      isOpen={modalDelete}
      toggle={toggleDeleteModal}
      className="modal-confirm danger"
      centered={true}>
      {/* <ModalHeader toggle={toggleDeleteModal}>Modal title</ModalHeader> */}
      <div className="modal-header">
        <div className="icon">
          <h4 className="ic-delete"></h4>
        </div>
      </div>
      <ModalBody>Are you sure you want to delete this?</ModalBody>
      <ModalFooter>
        <button
          className="btn btn-outline-gray-16 flex-grow-1"
          type="button"
          onClick={toggleDeleteModal}>
          Cancel
        </button>
        <button
          className="btn btn-danger flex-grow-1"
          type="button"
          onClick={() => {
            handleDeleteClick && handleDeleteClick();
            toggleDeleteModal();
          }}>
          Delete
        </button>
      </ModalFooter>
    </Modal>
  );
}

export default DeleteModal;
