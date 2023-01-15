import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import ProductCard from '../../Products/ProductCard/ProductCard';
import Loading from '../../Shared/Loading/Loading';
import BuyNowModal from '../../Products/BuyNowModal/BuyNowModal';

const Advertisements = () => {
    const [selectedForWishList, setSelectedForWishList] = useState(null);
    const { data: advertise = [], isLoading } = useQuery({
        queryKey: ['advertise'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_dnsName}/advertise`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('buy-sell-power-tools-token')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            {
                advertise.length > 0 &&
                <fieldset className="border border-solid border-primary rounded-xl p-3 m-2">
                    <legend className="px-2 font-bold">Advertisements</legend>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {
                            advertise.map(product => <ProductCard
                                key={product._id}
                                product={product}
                                setSelectedProduct={setSelectedForWishList}
                            />)
                        }
                    </div>
                    {
                        selectedForWishList &&
                        <BuyNowModal
                            selectedProduct={selectedForWishList}
                            setSelectedProduct={selectedForWishList}
                        />
                    }
                </fieldset>
            }
        </>
    );
};

export default Advertisements;