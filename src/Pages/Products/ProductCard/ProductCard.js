import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { GoVerified } from "react-icons/go";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from '../../../contexts/AuthProvider';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, setSelectedProduct }) => {
    const { user } = useContext(AuthContext);
    const { img, name, location, price, originalPrice, timeUsed, timePosted, seller, isVerified } = product;
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleAddToWishList = product => {
        const wishListItem = { ...product, userName: user?.displayName, userEmail: user?.email }
        console.log(wishListItem);
        if (user) {
            axios.post(`${process.env.REACT_APP_dnsName}/mywishlist`, wishListItem, {
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('buy-sell-power-tools-token')}`
                }
            })
                .then(res => {
                    console.log(res.data);
                    if (res.data.acknowledged) {
                        toast.success('This product is added to your wishlist.');
                        setSelectedProduct(null);
                    }
                })
                .catch(err => {
                    console.error(err);
                })
        } else {
            setShowLoginModal(!showLoginModal);
        }
    }


    return (
        <div>

            <div className="card glass">
                <figure className='border h-48 max-h-72'><img src={img} alt="productImage" className='' /></figure>
                <div className="card-body px-2 py-3 justify-between min-h-[200px]">
                    <h2 className="card-title text-xl">{name.length > 20 ? name.slice(0, 21) + '...' : name}</h2>
                    <div className='grid grid-cols-2'>
                        <strong className='text-md'>Price: ${price}</strong>
                        <p className='text-sm'>Location: {location}</p>
                        <p className='text-xs'>Time Used: {timeUsed}</p>
                        <small>Seller: {seller}{isVerified && <GoVerified className='text-blue-600 inline-block' />}</small>
                        <small>Original Price: ${originalPrice}</small>
                        <small>Posted On: {timePosted}</small>
                    </div>
                    <div className="card-actions justify-center">
                        <label
                            htmlFor="confirm-buy-modal"
                            onClick={() => setSelectedProduct(product)}
                            className="btn btn-primary btn-sm text-white"
                        >Buy Now</label>
                        <label
                            onClick={() => handleAddToWishList(product)}
                            className="btn btn-primary btn-sm btn-outline text-white"
                            htmlFor="confirmation-modal"
                        ><FaHeart className='mr-1' /> Save</label>
                    </div>

                </div>
            </div>
            {
                showLoginModal &&
                <>
                    <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box relative  dark:bg-slate-600 dark:text-slate-900">
                            <label htmlFor="confirmation-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                            <h2 className='text-2xl dark:text-white'>Please <Link className='font-bold cursor-pointer text-white bg-primary px-2 rounded-xl' to='/login'>Login</Link> first to save this Product </h2>
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default ProductCard;