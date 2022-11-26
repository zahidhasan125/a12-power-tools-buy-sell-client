import React from 'react';
import { GoVerified } from "react-icons/go";

const ProductCard = ({ product, setSelectedProduct }) => {
    const { img, name, location, price, originalPrice, timeUsed, timePosted, seller, isVerified } = product;
    return (
        <div className="card glass h-[560px]">
            <figure><img src={img} alt="productImage" className='w-full h-72' /></figure>
            <div className="card-body">
                <h2 className="card-title text-2xl">{name.length > 20 ? name.slice(0,21)+'...' : name}</h2>
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
                    <button className="btn btn-primary btn-outline text-white">Add to wishlist</button>
                </div>
                
            </div>
        </div>
    );
};

export default ProductCard;