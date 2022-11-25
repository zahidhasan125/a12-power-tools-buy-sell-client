import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
    const {_id, img, name, details} = category;
    return (
        <div className="card shadow-xl image-full">
            <figure><img className='w-96' src={img} alt="Category" /></figure>
            <div className="card-body">
                <h2 className="card-title text-white">{name}</h2>
                <p className=' text-white'>{details}</p>
                <div className="card-actions justify-center">
                    <Link to={`/category/${_id}`}><button className="btn btn-primary text-white">View Products</button></Link>
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;