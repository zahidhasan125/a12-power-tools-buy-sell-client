import React from 'react';

const EditProductInfoModal = ({ title, successButtonName, closeModal, modalData, successAction }) => {


    const handleEditedData = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const price = form.price.value;
        const updateDoc = {
            name: name,
            price: price
        }
        // console.log(modalData);
        successAction(modalData._id, updateDoc)
    }

    return (
        <div className='text-black'>
            <input type="checkbox" id="edit-product-info-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <label htmlFor="edit-product-info-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg">{title}</h3>

                    <form onSubmit={()=>handleEditedData}>
                        <div className="form-control w-3/4 mx-auto">
                            <label className="label">
                                <span className="label-text">Product Name</span>
                            </label>
                            <input name='name' defaultValue={modalData?.name} type="text" placeholder="Type here" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-3/4 mx-auto">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input name='price' defaultValue={modalData?.price} type="text" placeholder="$" className="input 
                    input-bordered w-full" />
                        </div>


                        <div className="modal-action">
                            <input                                
                                className="btn btn-primary"
                                type="submit"
                                value={successButtonName}
                            />
                            <button onClick={closeModal} className='btn btn-outline'>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProductInfoModal;