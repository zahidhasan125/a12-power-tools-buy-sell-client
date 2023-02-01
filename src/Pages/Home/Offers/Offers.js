import React from 'react';
import { FaShippingFast } from 'react-icons/fa';
import { MdOutlineHealthAndSafety, MdOutlineLocalOffer, MdSupportAgent } from 'react-icons/md'

const Offers = () => {
    return (
        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-2 my-8 gap-1'>
            <div className='flex items-center justify-around border-2 border-primary p-4'>
                <MdOutlineLocalOffer className='text-6xl text-primary' />
                <div>
                    <h5 className='text-xl font-semibold'>Hot Offers</h5>
                    <p>Discount upto 75%</p>
                </div>
            </div>
            <div className='flex items-center justify-around border-2 border-primary p-4'>
                <MdOutlineHealthAndSafety className='text-6xl text-primary' />
                <div>
                    <h5 className='text-xl font-semibold'>100% Safety</h5>
                    <p>Only secure payment</p>
                </div>
            </div>
            <div className='flex items-center justify-around border-2 border-primary p-4'>
                <MdSupportAgent className='text-6xl text-primary' />
                <div>
                    <h5 className='text-xl font-semibold'>Support 247</h5>
                    <p>Call us anytime</p>
                </div>
            </div>
            <div className='flex items-center justify-around border-2 border-primary p-4'>
                <FaShippingFast className='text-6xl text-primary' />
                <div>
                    <h5 className='text-xl font-semibold'>Free Shipping</h5>
                    <p>For Orders from $75</p>
                </div>
            </div>

        </section>
    );
};

export default Offers;