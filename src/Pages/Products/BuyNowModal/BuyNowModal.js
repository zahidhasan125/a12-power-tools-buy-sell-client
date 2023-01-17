import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../contexts/AuthProvider';
import toast from 'react-hot-toast';

const BuyNowModal = ({ selectedProduct, setSelectedProduct }) => {
    const { name, price } = selectedProduct;
    const { user } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const handleConfirm = data => {
        const orderedProduct = { ...data, img: selectedProduct.img, productId: selectedProduct._id };
        console.log(orderedProduct);

        axios.post(`${process.env.REACT_APP_dnsName}/orders`, orderedProduct, {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('buy-sell-power-tools-token')}`
            }
        })
            .then(res => {
                console.log(res.data);
                if (res.data.acknowledged) {
                    toast.success('This product is added to your orders.');
                    navigate('/dashboard/myorders');
                    setSelectedProduct(null);
                }
            })
            .catch(err => {
                console.error(err);
            })
    }
    return (
        <>
            <input type="checkbox" id="confirm-buy-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative  dark:bg-slate-600 dark:text-slate-900">
                    <label htmlFor="confirm-buy-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    {
                        user ?
                            <form onSubmit={handleSubmit(handleConfirm)}>
                                <div>
                                    <label className='text-sm ml-2' htmlFor="name">Name</label>
                                    <input type="text" {...register("userName")} value={user?.displayName} className="input input-bordered input-sm w-full mb-2 text-base" readOnly />
                                </div>
                                <div>
                                    <label className='text-sm ml-2' htmlFor="email">Email</label>
                                    <input type="text" {...register("userEmail")} value={user?.email} className="input input-bordered input-sm w-full mb-2 text-base" readOnly />
                                </div>
                                <div>
                                    <label className='text-sm ml-2' htmlFor="product">Product Name</label>
                                    <input type="text" {...register("productName")} value={name} className="input input-bordered input-sm w-full mb-2 text-base" readOnly />
                                </div>
                                <div>
                                    <label className='text-sm ml-2' htmlFor="price">Price</label>
                                    <input type="text" {...register("price")} value={`$${price}`} className="input input-bordered input-sm w-full mb-2 text-base" readOnly />
                                </div>
                                <div>
                                    <label className='text-sm ml-2' htmlFor="phone">Phone</label>
                                    <input type="text" {...register("phone")} placeholder='+880' className="input input-bordered input-sm w-full mb-2 text-base" />
                                </div>
                                <div>
                                    <label className='text-sm ml-2' htmlFor="location">Meeting Location</label>
                                    <input type="text" {...register("location")} placeholder='Dhaka, Khulna, Chittagong' className="input input-bordered input-sm w-full mb-2 text-base" />
                                </div>

                                <input type="submit" value="Confirm" className='btn btn-sm btn-primary w-full text-white' />
                            </form>
                            :
                            <h2 className='text-4xl'>Please <Link className='font-bold cursor-pointer text-white bg-primary px-2 rounded-xl' to='/login'>Login</Link> to Buy this Product </h2>
                    }
                </div>
            </div>
        </>
    );
};

export default BuyNowModal;