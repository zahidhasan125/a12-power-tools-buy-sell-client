import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { GoVerified } from "react-icons/go";
import { AuthContext } from '../../../contexts/AuthProvider';
import axios from 'axios';

const ProductCard = ({ product, setSelectedProduct }) => {
    const { user } = useContext(AuthContext);
    const { img, name, location, price, originalPrice, timeUsed, timePosted, seller, isVerified } = product;

    const handleAddToWishList = product => {
        const wishListItem = { ...product, userName: user?.displayName, userEmail: user?.email }
        console.log(wishListItem);
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
    }


    return (
        <div>

            <div className="card glass h-[560px]">
                <figure><img src={img} alt="productImage" className='w-full h-72' /></figure>
                <div className="card-body">
                    <h2 className="card-title text-2xl">{name.length > 20 ? name.slice(0, 21) + '...' : name}</h2>
                    <div className='grid grid-cols-2'>
                        <strong>Price: ${price}</strong>
                        <p>Location: {location}</p>
                        <p>Time Used: {timeUsed}</p>
                        <small>Seller: {seller}{isVerified && <GoVerified className='text-blue-600 inline-block' />}</small>
                        <small>Original Price: ${originalPrice}</small>
                        <small>Posted On: {timePosted}</small>
                    </div>
                    <div className="card-actions justify-center mt-8">
                        <label
                            htmlFor="confirm-buy-modal"
                            onClick={() => setSelectedProduct(product)}
                            className="btn btn-primary text-white"
                        >Buy Now</label>
                        <label
                            onClick={() => handleAddToWishList(product)}
                            className="btn btn-primary btn-outline text-white"
                            htmlFor="confirmation-modal"
                        >Add to wishlist</label>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductCard;