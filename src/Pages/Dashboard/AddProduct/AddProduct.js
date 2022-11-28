import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const AddProduct = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch('https://buy-sell-used-power-tools-server.vercel.app/category')
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])
    const handleAddProduct = data => {
        const image = data.image[0];
        const formData = new FormData();
        const dateNow = new Date();
        const month = toMonthName(dateNow.getMonth() + 1)

        function toMonthName(monthNumber) {
            const date = new Date();
            date.setMonth(monthNumber - 1);
            return date.toLocaleString('en-US', {
                month: 'short',
            });
        }
        const postedTime = dateNow.getDate() + ', ' + month + ', ' + dateNow.getFullYear();

        formData.append('image', image);

        const imgbbUrl = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbbKey}`

        fetch(imgbbUrl, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const productInfo = {
                        name: data.name,
                        img: imgData.data.url,
                        location: data.location,
                        originalPrice: data.originalPrice,
                        price: data.price,
                        phone: data.phone,
                        timeUsed: data.usedTime,
                        timePosted: postedTime,
                        details: data.details,
                        category: data.category,
                        seller: user?.displayName,
                        sellerEmail: user?.email,
                        isVerified: user?.isVerified
                    }
                    fetch('https://buy-sell-used-power-tools-server.vercel.app/product', {
                        method: "POST",
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('buy-sell-power-tools-token')}`
                        },
                        body: JSON.stringify(productInfo)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                toast.success('Congratulations!! Your product added Successfully.', {
                                    duration: 8000
                                })
                                navigate('/dashboard/myproducts')

                            }
                        })
                }
            })
    }
    return (
        <div className='my-8'>
            <h3 className='text-xl font-bold text-center'>Add A Product</h3>
            <form onSubmit={handleSubmit(handleAddProduct)}>
                <div className="form-control w-3/4 mx-auto">
                    <label className="label">
                        <span className="label-text">Product Name</span>
                    </label>
                    <input {...register('name', { required: 'Product name is required.' })} type="text" placeholder="Type here" className="input input-bordered w-full" />
                    {errors.name && <p className='text-red-700'>{errors.name?.message}</p>}
                </div>
                <div className="form-control w-3/4 mx-auto">
                    <label className="label">
                        <span className="label-text">Price</span>
                    </label>
                    <input {...register('price', { required: 'Price is required.' })} type="text" placeholder="$" className="input 
                    input-bordered w-full" />
                    {errors.price && <p className='text-red-700'>{errors.price?.message}</p>}
                </div>
                <div className="form-control w-3/4 mx-auto">
                    <label className="label">
                        <span className="label-text">Select Product Condition</span>
                    </label>
                    <select {...register('condition')} className="select select-bordered w-full mx-auto">
                        <option value="fair">Fair</option>
                        <option value="good">Good</option>
                        <option value="excellent">Excellent</option>
                    </select>
                </div>
                <div className="form-control w-3/4 mx-auto">
                    <label className="label">
                        <span className="label-text">Select Product Category</span>
                    </label>
                    <select {...register('category')} className="select select-bordered w-full mx-auto">
                        {
                            categories.map(category => <option key={category._id} value={category.name}>{category.name}</option>)
                        }
                    </select>
                </div>
                <div className="form-control w-3/4 mx-auto">
                    <label className="label">
                        <span className="label-text">Phone Number</span>
                    </label>
                    <input {...register('phone', { required: 'Phone number is required.' })} type="text" placeholder="+88" className="input input-bordered w-full" />
                    {errors.phone && <p className='text-red-700'>{errors.phone?.message}</p>}
                </div>
                <div className="form-control w-3/4 mx-auto">
                    <label className="label">
                        <span className="label-text">Location</span>
                    </label>
                    <input type="text" {...register('location', { required: 'Location is required.' })} placeholder="Dhaka, Chittagong, Khulna" className="input input-bordered w-full" />
                    {errors.location && <p className='text-red-700'>{errors.location?.message}</p>}
                </div>
                <div className="form-control w-3/4 mx-auto">
                    <label className="label">
                        <span className="label-text">Original Price</span>
                    </label>
                    <input type="text" {...register('originalPrice', { required: 'Original price is required.' })} placeholder="$" className="input input-bordered w-full" />
                    {errors.originalPrice && <p className='text-red-700'>{errors.originalPrice?.message}</p>}
                </div>
                <div className="form-control w-3/4 mx-auto">
                    <label className="label">
                        <span className="label-text">Purchased Year</span>
                    </label>
                    <input type="text" {...register('purchased', { required: 'Purchased Year is required.' })} placeholder="2015" className="input input-bordered w-full" />
                    {errors.purchased && <p className='text-red-700'>{errors.purchased?.message}</p>}
                </div>
                <div className="form-control w-3/4 mx-auto">
                    <label className="label">
                        <span className="label-text">Used Time</span>
                    </label>
                    <input type="text" {...register('usedTime', { required: 'Used time is required.' })} placeholder="2 years 5 months" className="input input-bordered w-full" />
                    {errors.usedTime && <p className='text-red-700'>{errors.usedTime?.message}</p>}
                </div>
                <div className="form-control w-3/4 mx-auto">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea {...register('details', { required: 'Description is required.' })} className="textarea textarea-bordered w-full" placeholder="Type description here"></textarea>
                    {errors.details && <p className='text-red-700'>{errors.details?.message}</p>}
                </div>
                <div className="form-control w-3/4 mx-auto">
                    <label className="label">
                        <span className="label-text">Image</span>
                    </label>
                    <input type="file" {...register('image', { required: 'Image time is required.' })} className="file-input text-primary file-input-bordered w-full" />
                    {errors.image && <p className='text-red-700'>{errors.image?.message}</p>}
                </div>
                <div className='w-3/4 mx-auto mt-8'>
                    <input type="submit" className='btn btn-primary w-full text-white' value="Submit" />
                </div>
            </form>
        </div>
    );
};

export default AddProduct;