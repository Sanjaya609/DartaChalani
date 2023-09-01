// import React, { useState } from 'react';
import { Modal, ModalBody, ModalFooter } from '../utils';

interface ConfirmModalProps {
    toggleConfirmModal: () => void;
    handleConfirmClick: () => void;
    confirmModal: boolean
    title?: string
}
const ConfirmModal = (props: ConfirmModalProps) => {
    const { toggleConfirmModal, handleConfirmClick, confirmModal, title = "Are you sure to move forward with this process?" } = props;
    return (
        <Modal
            isOpen={confirmModal}
            toggle={toggleConfirmModal}
            className="modal-confirm primary"
            centered={true}
            backdrop={"static"}>
            <div className="modal-header">
                <div className="icon">
                    <h4 className="ic-info" />
                </div>
            </div>
            <ModalBody>{title}</ModalBody>
            <ModalFooter>
                <button
                    className="btn btn-outline-gray-16 flex-grow-1"
                    type="button"
                    onClick={toggleConfirmModal}>
                    Cancel
                </button>
                <button
                    className="btn btn-primary flex-grow-1"
                    type="button"
                    onClick={() => {
                        handleConfirmClick && handleConfirmClick();
                        toggleConfirmModal();
                    }}>
                    Confirm
                </button>
            </ModalFooter>
        </Modal>
    )
}

export default ConfirmModal