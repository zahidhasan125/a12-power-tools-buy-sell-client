import React from 'react';

const ConfirmationModal = ({ title, message, successButtonName, closeModal, modalData, successAction }) => {
    return (
        <div className='text-black'>
            <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box text-center w-auto">
                    <label htmlFor="confirmation-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="pb-4">{message}</p>
                    <div className="modal-action justify-center mt-0">
                        <label
                            onClick={() => successAction(modalData._id)}
                            htmlFor="confirmation-modal"
                            className="btn btn-primary btn-sm">{successButtonName}</label>
                        <button onClick={closeModal} className='btn btn-outline btn-sm'>cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;