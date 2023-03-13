import React from 'react';

const LimitedOffers = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 mx-2 my-8 gap-6'>
            <div className='w-full bg-primary text-black flex p-6 gap-10 flex-col md:flex-row'>
                <div>
                    <h6 className='text-3xl font-semibold'>Big sale countdown</h6>
                    <h2 className='text-7xl font-bold my-2'>Hurry Up!</h2>
                    <p>Buy & Sell your products here</p>
                </div>
                <div className='mx-auto'>
                    <div className='flex items-center justify-center '>
                        <h1 className='text-8xl font-bold'>75</h1>
                        <div>
                            <h2 className='text-6xl font-semibold'>%</h2>
                            <h className='text-md font-bold'>OFF</h>
                        </div>
                    </div>
                    <button className='btn btn-outline btn-accent'>View Details</button>
                </div>
            </div>
            <div className='text-center bg-gray-800 text-white'>
                <div className='border-4 border-white m-8 h-auto p-4'>
                    <p className='font-semibold text-xl'>Original Products <span className='text-primary'>2022</span></p>
                    <h3 className='text-5xl font-bold'>Discover new arrivals</h3>
                    <p className='text-primary text-xl'>1000+ spare parts</p>
                </div>
            </div>
        </div>
    );
};

export default LimitedOffers;