import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckOutForm from './CheckOutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
    const order = useLoaderData();
    // const navigation = useNavigation();
    const { productName, price } = order;
    const amount = parseInt(price.substring(1))

    // if(navigation.state === "loading"){
    //     return <Loading></Loading>
    // }
    return (
        <div className='mx-auto my-8 text'>
            <div className='text-center'>
                <h3 className="text-3xl">Payment for {productName}</h3>
                <p className="text-xl">Please pay <strong>${amount}</strong> for confirming your order.</p>
            </div>
            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <CheckOutForm
                        order={order}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;